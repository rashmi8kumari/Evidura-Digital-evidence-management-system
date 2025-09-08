import React from "react";

const Terms = () => {
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
      <h1 className="text-center mb-4 fw-bold text-primary">Terms of Use</h1>
      <p className="text-center text-light">
        WEBSITE / SERVICES TERMS OF USE
      </p>

      <section className="mt-4">
        <p>
          This page states the Terms of Use for the <strong>Evidura </strong> 
          website (the “Website”) and the services available through the Website 
          (collectively, the “Services”). By using this Website and/or the Services, 
          you signify that you have read, understood, and agree to be bound by these 
          Terms of Use. If you do not accept these Terms, please do not use the Website 
          or the Services.
        </p>
      </section>

      <section className="mt-4">
        <h4>Description of Services</h4>
        <p>
          The Website enables access to features such as case management, 
          digital evidence tracking, role-based dashboards, and other resources. 
          We make reasonable efforts to provide uninterrupted access to the Website, 
          but access may be suspended, restricted, or terminated at any time 
          without notice.
        </p>
      </section>

      <section className="mt-4">
        <h4>User Conduct & Limitations</h4>
        <p>
          You agree not to upload, post, or share any content that is unlawful, harmful, 
          offensive, or violates the rights of others. Additionally, you may not attempt 
          to hack, disrupt, or reverse engineer the Website or Services, or use the Services 
          for any unauthorized or illegal purpose.
        </p>
      </section>

      <section className="mt-4">
        <h4>Intellectual Property</h4>
        <p>
          All content, trademarks, logos, and software associated with Evidura 
          are owned or licensed by their respective creators. You may not copy, reproduce, 
          or redistribute any part of the Website or Services without prior written consent.
        </p>
      </section>

      <section className="mt-4">
        <h4>Privacy & Data</h4>
        <p>
          We value user privacy. Data such as login details, evidence metadata, 
          and case records are protected. By using the Services, you agree that necessary 
          logs (IP address, device type, timestamps) may be collected for security and auditing purposes.
        </p>
      </section>

      <section className="mt-4">
        <h4>Limitation of Liability</h4>
        <p>
          The Website and Services are provided "as is" and "as available". 
          Evidence Tracker and its contributors are not responsible for any 
          direct, indirect, or consequential damages arising from use of the Website or Services.
        </p>
      </section>

      <section className="mt-4">
        <h4>Changes</h4>
        <p>
          We reserve the right to update or modify these Terms of Use at any time. 
          Continued use of the Website after changes are posted indicates your acceptance 
          of those changes.
        </p>
      </section>

      <section className="mt-4">
        <h4>Contact</h4>
        <p>
          For any questions about these Terms, please contact us at <strong>support@evidura.com</strong>.
        </p>
      </section>

      <p className="text-light mt-5 text-center">
        Last Updated: September 7, 2025
      </p>
    </div>
  );
};

export default Terms;

