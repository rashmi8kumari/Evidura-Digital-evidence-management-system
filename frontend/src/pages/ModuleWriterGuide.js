import React from "react";

function ModuleWriterGuide() {
  return (
    <div className="card shadow p-4">
      <h2 className="mb-3 text-warning">Module Writer Guide</h2>
      <p>
        If you want to contribute to the Evidence Tracker project, this guide
        will help you understand the structure and development process.
      </p>
      <ul>
        <li>🛠️ Follow coding standards (React + Node.js).</li>
        <li>📦 Organize components inside <code>/components</code> and pages inside <code>/pages</code>.</li>
        <li>🔑 Always use role-based access for new modules.</li>
        <li>🧪 Write test cases for critical features.</li>
      </ul>
    </div>
  );
}

export default ModuleWriterGuide;
