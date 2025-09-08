import React from "react";

function About() {
  const cardStyle = {
    backgroundColor: "#2f2f2f", // dark grey
    color: "#ffffff",
    border: "none",
    borderRadius: "12px",
    maxWidth: "800px",
    margin: "20px auto",
    padding: "30px"
  };

  return (
    <div className="card shadow" style={cardStyle}>
      <h2 className="mb-3 text-primary">About Evidura</h2>

      <p>
        <strong>Evidura</strong> is a state-of-the-art digital platform
        designed to monitor, manage, and streamline the flow of criminal case
        evidence across the entire judicial ecosystem—including Police, FSL
        (Forensic Science Lab), and Court. By ensuring a secure, auditable,
        and real-time chain of custody, our platform enhances transparency,
        accountability, and efficiency at every step of legal proceedings.
      </p>

      <h4 className="mt-4">Purpose and Vision</h4>
      <p>
        The traditional process of evidence management often suffers from delays,
        misplaced documents, and lack of coordination between stakeholders.
        Evidura aims to modernize this workflow by providing a unified
        system that reduces errors, improves traceability, and accelerates
        judicial decisions. Our vision is a fair, transparent, and
        data-driven justice system where every piece of evidence is accounted
        for and securely tracked.
      </p>

      <h4 className="mt-4">Key Features</h4>
      <ul>
        <li>Role-based dashboards for Police, FSL, Court, and Admin.</li>
        <li>Secure evidence entry and custody tracking.</li>
        <li>Real-time status updates for cases and evidence.</li>
        <li>Transfer evidence between Police, FSL, and Court digitally.</li>
        <li>Upload forensic reports and attach files directly to evidence.</li>
        <li>Audit logs for full transparency of actions performed on evidence.</li>
        <li>Pagination, filters, and search for efficient navigation.</li>
      </ul>

      <h4 className="mt-4">Roles and Responsibilities</h4>
      <ul>
        <li>
          <strong>Police:</strong> Record new evidence, track cases, and
          transfer items to FSL or Court.
        </li>
        <li>
          <strong>FSL Lab:</strong> Receive evidence, perform analysis,
          upload reports, and send it back to Police or Court.
        </li>
        <li>
          <strong>Court:</strong> Review evidence, access forensic reports,
          and make informed judicial decisions.
        </li>
        <li>
          <strong>Admin:</strong> Manage users, assign roles, oversee the
          workflow, and ensure smooth operations.
        </li>
      </ul>

      <h4 className="mt-4">Security and Privacy</h4>
      <p>
        Evidura employs advanced security measures including encrypted
        storage, secure authentication, and role-based access control. User
        credentials, evidence data, and audit logs are fully protected. Only
        authorized personnel can access sensitive information, ensuring
        compliance with legal and privacy standards.
      </p>

      <h4 className="mt-4">Benefits</h4>
      <ul>
        <li>Reduces delays in case handling.</li>
        <li>Minimizes errors due to manual tracking.</li>
        <li>Improves accountability and transparency across departments.</li>
        <li>Provides a reliable audit trail for legal verification.</li>
        <li>Enhances collaboration between Police, FSL, and Court.</li>
      </ul>

      <h4 className="mt-4">Conclusion</h4>
      <p>
        Evidura is more than a management tool—it is a digital solution
        aimed at transforming the judicial process by providing a secure, reliable,
        and efficient system for evidence management. By bridging gaps between
        Police, FSL, and Court, it ensures that justice is delivered faster,
        accurately, and transparently.
      </p>
    </div>
  );
}

export default About;


