import React from "react";
import { Link } from "react-router-dom";
import { FaLock, FaFileContract, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      className="text-light shadow-sm"
      style={{
        background: "linear-gradient(90deg, #141e30, #243b55)",
        borderTop: "1px solid rgba(255,255,255,0.1)",
        position: "sticky",   // Use sticky for pages with scroll
        bottom: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
        padding: "1rem 0",
      }}
    >
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
        {/* Left side: Copyright */}
        <span className="fw-semibold text-center text-md-start" style={{ fontSize: "1rem" }}>
          © 2025 <strong className="text-info">EVIDURA</strong> — All Rights Reserved
        </span>

        {/* Right side: Links */}
        <div className="mt-3 mt-md-0 text-center text-md-end">
          <Link to="/terms" className="footer-link me-3">
            <FaFileContract className="me-1" /> Terms
          </Link>
          <Link to="/privacy" className="footer-link me-3">
            <FaLock className="me-1" /> Privacy
          </Link>
          <Link to="/contact" className="footer-link">
            <FaEnvelope className="me-1" /> Contact
          </Link>
        </div>
      </div>

      {/* Footer Styling */}
      <style>{`
        .footer-link {
          color: #ddd;
          text-decoration: none;
          font-size: 1rem;
          font-weight: 500;
          transition: all 0.3s ease;
        }
        .footer-link:hover {
          color: #00e6e6;
          text-shadow: 0 0 8px #00e6e6;
        }
      `}</style>
    </footer>
  );
};

export default Footer;




