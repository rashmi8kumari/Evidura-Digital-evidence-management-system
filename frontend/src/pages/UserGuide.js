import React from "react";
import { motion } from "framer-motion";

function UserGuide() {
  const cardStyle = {
    backgroundColor: "#fff", // white card
    color: "#000",
    borderRadius: "16px",
    maxWidth: "750px",
    padding: "35px",
    margin: "40px auto",
    boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
  };

  const listItemStyle = {
    padding: "12px 15px",
    borderRadius: "10px",
    marginBottom: "12px",
    transition: "all 0.3s ease",
    backgroundColor: "#f8f9fa",
  };

  return (
    <motion.div
      className="card"
      style={cardStyle}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      whileHover={{ scale: 1.02, boxShadow: "0 10px 25px rgba(0,0,0,0.25)" }}
    >
      <motion.h2
        className="mb-3 fw-bold"
        style={{ color: "#0dcaf0" }}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        User Guide
      </motion.h2>

      <p className="text-muted">
        This guide explains how different roles can use the{" "}
        <strong>Evidence Tracker</strong> system effectively:
      </p>

      <ol className="ms-2 mt-3">
        <motion.li
          style={listItemStyle}
          whileHover={{ backgroundColor: "#e9f7fe", scale: 1.02 }}
        >
          <strong>Police:</strong> Add and transfer evidence to FSL or Court.
        </motion.li>

        <motion.li
          style={listItemStyle}
          whileHover={{ backgroundColor: "#e9f7fe", scale: 1.02 }}
        >
          <strong>FSL:</strong> Receive evidence, analyze it, and upload reports.
        </motion.li>

        <motion.li
          style={listItemStyle}
          whileHover={{ backgroundColor: "#e9f7fe", scale: 1.02 }}
        >
          <strong>Court:</strong> Accept evidence and review case status.
        </motion.li>

        <motion.li
          style={listItemStyle}
          whileHover={{ backgroundColor: "#e9f7fe", scale: 1.02 }}
        >
          <strong>Admin:</strong> Manage users, dashboards, and oversee flow.
        </motion.li>
      </ol>
    </motion.div>
  );
}

export default UserGuide;


