import React from "react";

function UserGuide() {
  return (
    <div className="card shadow p-4">
      <h2 className="mb-3 text-info">User Guide</h2>
      <p>
        This guide explains how different roles (Police, FSL, Court, Admin) can
        use the Evidence Tracker system.
      </p>
      <ol>
        <li> Police: Add and transfer evidence to FSL or Court.</li>
        <li> FSL: Receive evidence, analyze it, and upload reports.</li>
        <li> Court: Accept evidence and review case status.</li>
        <li> Admin: Manage users, dashboards, and oversee flow.</li>
      </ol>
    </div>
  );
}

export default UserGuide;
