import React from "react";
import { Link } from "react-router-dom";

function Community() {
  const cardStyle = {
    backgroundColor: "#2f2f2f", // dark grey
    color: "#ffffff",
    border: "none"
  };

  return (
    <div className="card shadow p-4" style={cardStyle}>
      <h2 className="mb-3 text-success">Community Support</h2>
      <p>
        Need help? Our community provides guides and support to get you started.
      </p>
      <ul>
        <li>
          <Link to="/community/user-guide" className="text-white">User Guide</Link>
        </li>
        <li>
          <Link to="/community/module-writer" className="text-white">Module Writer Guide</Link>
        </li>
      </ul>
    </div>
  );
}

export default Community;

