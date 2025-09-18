import express from "express";
import Contact from "../models/Contact.js";
import nodemailer from "nodemailer";

const router = express.Router();

// POST: Save contact form data + send email
router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, jobTitle, organization, email, country, message } = req.body;

    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({ error: "Please fill all required fields" });
    }

    // Save to DB
    const newContact = new Contact({
      firstName,
      lastName,
      jobTitle,
      organization,
      email,
      country,
      message,
    });
    await newContact.save();

    // Send Email Notification
    let transporter = nodemailer.createTransport({
      service: "gmail", // ya SMTP config
      auth: {
        user: process.env.EMAIL_USER, // Gmail ya SMTP user
        pass: process.env.EMAIL_PASS, // Gmail App password
      },
    });

    await transporter.sendMail({
      from: `"Evidence Tracker Contact" <${process.env.EMAIL_USER}>`,
      to: "info@evidura.in", // jahan tumhe notification chahiye
      subject: ` New Contact Message from ${firstName} ${lastName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><b>Name:</b> ${firstName} ${lastName}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Job Title:</b> ${jobTitle || "N/A"}</p>
        <p><b>Organization:</b> ${organization || "N/A"}</p>
        <p><b>Country:</b> ${country || "N/A"}</p>
        <p><b>Message:</b></p>
        <p>${message}</p>
      `,
    });

    res.status(201).json({ success: true, message: "Contact form submitted and email sent successfully!" });
  } catch (error) {
    console.error("Error saving contact:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// GET: Admin can see all contact messages
router.get("/", async (req, res) => {
  try {
    const messages = await Contact.find().sort({ date: -1 });
    res.json(messages);
  } catch (error) {
    console.error(" Error fetching contacts:", error);
    res.status(500).json({ error: "Failed to fetch contact messages" });
  }
});

export default router;

