import React from "react";

function UserGuide() {
  return (
    <div
      className="card shadow-sm p-4 mx-auto"
      style={{ maxWidth: "700px", backgroundColor: "#f8f9fa", borderRadius: "12px" }}
    >
      <h2 className="mb-3 text-info">User Guide</h2>
      <p className="text-muted">
        This guide explains how different roles (Police, FSL, Court, Admin) can
        use the Evidence Tracker system.
      </p>
      <ol className="ms-3">
        <li> <strong>Police:</strong> Add and transfer evidence to FSL or Court.</li>
        <li> <strong>FSL:</strong> Receive evidence, analyze it, and upload reports.</li>
        <li> <strong>Court:</strong> Accept evidence and review case status.</li>
        <li> <strong>Admin:</strong> Manage users, dashboards, and oversee flow.</li>
      </ol>
    </div>
  );
}

export default UserGuide;

