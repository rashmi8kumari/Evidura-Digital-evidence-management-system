// src/components/Footer.js
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-3 mt-auto fixed-bottom shadow-sm">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
        <span>© 2025 EVIDURA ALL RIGHTS RESERVED.</span>
        <div>
          <Link to="/terms" className="text-decoration-none text-light me-3">
            Terms of Use
          </Link>
          <Link to="/privacy" className="text-decoration-none text-light me-3">
            Privacy Policy
          </Link>
          <Link to="/contact" className="text-decoration-none text-light">
            Contact Us
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
