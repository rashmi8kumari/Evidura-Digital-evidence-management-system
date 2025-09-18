// src/pages/Community.js
import React from "react";
import { Link } from "react-router-dom";

function Community() {
  const cardStyle = {
    backgroundColor: "#ffffff", // White
    color: "#000000",           // Black text
    border: "1px solid rgba(0,0,0,0.1)",
    borderRadius: "12px"
  };

  return (
    <div className="card shadow-lg p-4" style={cardStyle}>
      <h2 className="mb-3 text-primary fw-bold">Community Support</h2>
      <p className="text-muted">
        Need help? Our community provides guides and resources to get you started quickly and effectively.
      </p>
      
      <ul className="list-unstyled mt-3">
        <li className="mb-2">
          <Link 
            to="/community/user-guide" 
            className="btn btn-outline-primary w-100 text-start"
          >
            User Guide
          </Link>
        </li>
        <li>
          <Link 
            to="/community/module-writer" 
            className="btn btn-outline-success w-100 text-start"
          >
            Module Writer Guide
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Community;


