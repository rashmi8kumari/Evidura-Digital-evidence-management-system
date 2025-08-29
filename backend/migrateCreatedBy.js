// migrateCreatedBy.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Evidence from "./models/Evidence.js";
import CustodyLog from "./models/CustodyLog.js";

dotenv.config();

const runMigration = async () => {
  try {
    // connect to DB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // find evidences without createdBy
    const evidences = await Evidence.find({ $or: [{ createdBy: { $exists: false } }, { createdBy: null }] });
    console.log(`Found ${evidences.length} evidences without createdBy`);

    for (const ev of evidences) {
      // get earliest custody log for this evidence
      const firstLog = await CustodyLog.findOne({ evidenceId: ev._id })
        .sort({ timestamp: 1 })
        .populate("toUser", "_id role");

      if (firstLog && firstLog.toUser) {
        ev.createdBy = firstLog.toUser._id;
        await ev.save();
        console.log(`Updated evidence ${ev._id} → createdBy = ${firstLog.toUser._id}`);
      } else {
        console.log(`No custody log found for evidence ${ev._id}, skipped`);
      }
    }

    console.log("Migration complete!");
    process.exit(0);
  } catch (err) {
    console.error("Migration failed", err);
    process.exit(1);
  }
};

runMigration();


