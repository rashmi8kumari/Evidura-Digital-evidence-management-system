import React from "react";

function ModuleWriterGuide() {
  return (
    <div className="d-flex justify-content-center align-items-center py-5">
      <div
        className="card shadow-lg border-0 p-4"
        style={{ maxWidth: "720px", width: "100%", borderRadius: "12px" }}
      >
        <h2 className="mb-3 text-warning fw-bold">Module Writer Guide</h2>
        <p>
          If you want to contribute to the <strong>Evidence Tracker</strong>{" "}
          project, this guide will help you understand the structure and
          development process.
        </p>
        <ul className="mt-3">
          <li> Follow coding standards (<strong>React + Node.js</strong>).</li>
          <li>
             Organize components inside <code>/components</code> and pages
            inside <code>/pages</code>.
          </li>
          <li> Always use role-based access for new modules.</li>
          <li> Write test cases for critical features.</li>
        </ul>
      </div>
    </div>
  );
}

export default ModuleWriterGuide;

