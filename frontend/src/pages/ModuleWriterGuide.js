import React from "react";
import { FaCode, FaProjectDiagram, FaUserShield, FaCheckCircle } from "react-icons/fa";

function ModuleWriterGuide() {
  return (
    <div className="d-flex justify-content-center align-items-center py-5 px-3">
      <div
        className="card shadow-lg border-0 p-4 fade-in"
        style={{
          maxWidth: "800px",
          width: "100%",
          borderRadius: "14px",
          backgroundColor: "#ffffff",
          color: "#000000",
        }}
      >
        <h2 className="mb-4 fw-bold text-center text-primary">
          Module Writer Guide
        </h2>
        <p className="text-muted text-center">
          Contribute effectively to the <strong>Evidura</strong> by
          following these best practices and standards.
        </p>

        <ul className="list-unstyled mt-4">
          <li className="mb-3 d-flex align-items-start">
            <FaCode className="text-primary me-2 mt-1" />
            <span>
              Follow clean coding standards with <strong>React + Node.js</strong>.
            </span>
          </li>
          <li className="mb-3 d-flex align-items-start">
            <FaProjectDiagram className="text-success me-2 mt-1" />
            <span>
              Organize components inside <code>/components</code> and pages inside{" "}
              <code>/pages</code> for better structure.
            </span>
          </li>
          <li className="mb-3 d-flex align-items-start">
            <FaUserShield className="text-warning me-2 mt-1" />
            <span>
              Always use <strong>role-based access</strong> when building new modules.
            </span>
          </li>
          <li className="mb-3 d-flex align-items-start">
            <FaCheckCircle className="text-success me-2 mt-1" />
            <span>
              Write test cases for critical features to ensure stability and security.
            </span>
          </li>
        </ul>
      </div>

      {/* Smooth fade-in animation */}
      <style>{`
        .fade-in {
          opacity: 0;
          transform: translateY(15px);
          animation: fadeInUp 0.6s forwards;
        }
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default ModuleWriterGuide;


