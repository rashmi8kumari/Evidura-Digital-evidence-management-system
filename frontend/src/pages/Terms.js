import React from "react";
import { motion } from "framer-motion";

const Terms = () => {
  const cardStyle = {
    backgroundColor: "#fff", // white card
    color: "#000", // black text
    border: "none",
    borderRadius: "16px",
    maxWidth: "900px",
    margin: "40px auto",
    padding: "40px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  };

  const sectionHover = {
    transition: "all 0.3s ease",
    padding: "15px",
    borderRadius: "10px",
  };

  return (
    <motion.div
      className="card"
      style={cardStyle}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      whileHover={{ scale: 1.02, boxShadow: "0 8px 25px rgba(0,0,0,0.25)" }}
    >
      <motion.h1
        className="text-center mb-3 fw-bold"
        style={{ color: "#007bff" }}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        Terms of Use
      </motion.h1>

      <p className="text-center text-muted">
        WEBSITE / SERVICES TERMS OF USE
      </p>

      {/* Sections */}
      <motion.section
        className="mt-4"
        whileHover={{ backgroundColor: "#f8f9fa" }}
        style={sectionHover}
      >
        <p>
          This page states the Terms of Use for the <strong>Evidura</strong>{" "}
          website (the “Website”) and the services available through the Website
          (collectively, the “Services”). By using this Website and/or the
          Services, you signify that you have read, understood, and agree to be
          bound by these Terms of Use. If you do not accept these Terms, please
          do not use the Website or the Services.
        </p>
      </motion.section>

      <motion.section
        className="mt-4"
        whileHover={{ backgroundColor: "#f8f9fa" }}
        style={sectionHover}
      >
        <h4 className="fw-semibold text-primary">Description of Services</h4>
        <p>
          The Website enables access to features such as case management,
          digital evidence tracking, role-based dashboards, and other resources.
          We make reasonable efforts to provide uninterrupted access to the
          Website, but access may be suspended, restricted, or terminated at any
          time without notice.
        </p>
      </motion.section>

      <motion.section
        className="mt-4"
        whileHover={{ backgroundColor: "#f8f9fa" }}
        style={sectionHover}
      >
        <h4 className="fw-semibold text-primary">User Conduct & Limitations</h4>
        <p>
          You agree not to upload, post, or share any content that is unlawful,
          harmful, offensive, or violates the rights of others. Additionally,
          you may not attempt to hack, disrupt, or reverse engineer the Website
          or Services, or use the Services for any unauthorized or illegal
          purpose.
        </p>
      </motion.section>

      <motion.section
        className="mt-4"
        whileHover={{ backgroundColor: "#f8f9fa" }}
        style={sectionHover}
      >
        <h4 className="fw-semibold text-primary">Intellectual Property</h4>
        <p>
          All content, trademarks, logos, and software associated with Evidura
          are owned or licensed by their respective creators. You may not copy,
          reproduce, or redistribute any part of the Website or Services without
          prior written consent.
        </p>
      </motion.section>

      <motion.section
        className="mt-4"
        whileHover={{ backgroundColor: "#f8f9fa" }}
        style={sectionHover}
      >
        <h4 className="fw-semibold text-primary">Privacy & Data</h4>
        <p>
          We value user privacy. Data such as login details, evidence metadata,
          and case records are protected. By using the Services, you agree that
          necessary logs (IP address, device type, timestamps) may be collected
          for security and auditing purposes.
        </p>
      </motion.section>

      <motion.section
        className="mt-4"
        whileHover={{ backgroundColor: "#f8f9fa" }}
        style={sectionHover}
      >
        <h4 className="fw-semibold text-primary">Limitation of Liability</h4>
        <p>
          The Website and Services are provided "as is" and "as available".
          Evidence Tracker and its contributors are not responsible for any
          direct, indirect, or consequential damages arising from use of the
          Website or Services.
        </p>
      </motion.section>

      <motion.section
        className="mt-4"
        whileHover={{ backgroundColor: "#f8f9fa" }}
        style={sectionHover}
      >
        <h4 className="fw-semibold text-primary">Changes</h4>
        <p>
          We reserve the right to update or modify these Terms of Use at any
          time. Continued use of the Website after changes are posted indicates
          your acceptance of those changes.
        </p>
      </motion.section>

      <motion.section
        className="mt-4"
        whileHover={{ backgroundColor: "#f8f9fa" }}
        style={sectionHover}
      >
        <h4 className="fw-semibold text-primary">Contact</h4>
        <p>
          For any questions about these Terms, please contact us at{" "}
          <strong>support@evidura.com</strong>.
        </p>
      </motion.section>

      <p className="text-muted mt-5 text-center">
        Last Updated: September 7, 2025
      </p>
    </motion.div>
  );
};

export default Terms;


