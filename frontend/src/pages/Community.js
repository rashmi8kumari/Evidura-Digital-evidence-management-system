import React from "react";
import { Link } from "react-router-dom";

function Community() {
  return (
    <div className="card shadow p-4">
      <h2 className="mb-3 text-success">Community Support</h2>
      <p>
        Need help? Our community provides guides and support to get you started.
      </p>
      <ul>
        <li>
          <Link to="/community/user-guide"> User Guide</Link>
        </li>
        <li>
          <Link to="/community/module-writer"> Module Writer Guide</Link>
        </li>
      </ul>
    </div>
  );
}

export default Community;
