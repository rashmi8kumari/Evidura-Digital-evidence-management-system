import React, { useEffect } from "react";

const PrivacyPolicy = () => {
  // Fade-in animation on mount
  useEffect(() => {
    const sections = document.querySelectorAll(".animate-section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.2 }
    );
    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-start py-5 px-3">
      <div
        className="card shadow-lg border-0 p-4 animate-fadeIn"
        style={{
          maxWidth: "900px",
          width: "100%",
          borderRadius: "14px",
          backgroundColor: "#ffffff",
          color: "#212529",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
        }}
      >
        <h1 className="text-center fw-bold mb-2 text-primary">
          Privacy Policy
        </h1>
        <p className="text-muted text-center mb-4">
          (Last Updated on September 7, 2025; Version 2025/1.0)
        </p>

        {/* Sections */}
        <section className="mt-4 animate-section">
          <h4 className="fw-semibold text-primary heading-underline">
            What Information Do We Collect?
          </h4>
          <ul className="mt-2">
            <li>
              <strong>Content:</strong> Any evidence or data submitted or stored
              by users of the Services.
            </li>
            <li>
              <strong>Reviews and Comments:</strong> Information voluntarily
              shared by users in community forums.
            </li>
            <li>
              <strong>Registration Information:</strong> Name, email, password,
              role, contact details, and billing information.
            </li>
            <li>
              <strong>Customer Service Communications:</strong> Support
              requests, bug reports, and suggestions.
            </li>
            <li>
              <strong>Log Information:</strong> IP address, device/browser
              details, timestamps, and authentication tokens.
            </li>
          </ul>
        </section>

        <section className="mt-4 animate-section">
          <h4 className="fw-semibold text-primary heading-underline">
            Age Limitation
          </h4>
          <p>
            The Services are not directed to persons under the age of 18. If we
            become aware that a person under 18 has provided us with personal
            information, we take steps to remove such information and terminate
            the account.
          </p>
        </section>

        <section className="mt-4 animate-section">
          <h4 className="fw-semibold text-primary heading-underline">
            How Do We Use This Information?
          </h4>
          <p>
            We collect information primarily to provide and improve our
            Services, resolve disputes, ensure security, and communicate
            important updates. Information may also be used for:
          </p>
          <ul>
            <li>Providing dashboards and role-based access</li>
            <li>Improving user experience</li>
            <li>Fraud prevention and security monitoring</li>
            <li>Customer support and service updates</li>
          </ul>
        </section>

        <section className="mt-4 animate-section">
          <h4 className="fw-semibold text-primary heading-underline">
            Sharing & Transfer of Information
          </h4>
          <p>
            We do not sell, rent, or trade your personal data. However, we may
            share information with trusted vendors, hosting providers, or
            third-party partners necessary to operate our Services. Data may be
            transferred internationally where required.
          </p>
        </section>

        <section className="mt-4 animate-section">
          <h4 className="fw-semibold text-primary heading-underline">
            Security of Your Data
          </h4>
          <p>
            We take appropriate organizational and technical measures to
            safeguard your data. However, internet communications are not always
            secure, and we cannot guarantee absolute protection. Users are
            responsible for keeping their account credentials confidential.
          </p>
        </section>

        <section className="mt-4 animate-section">
          <h4 className="fw-semibold text-primary heading-underline">
            Your Rights
          </h4>
          <p>
            You can review, update, or request deletion of your personal data by
            contacting us. Upon verification, we will take steps to fulfill your
            request in accordance with applicable laws.
          </p>
        </section>

        <section className="mt-4 animate-section">
          <h4 className="fw-semibold text-primary heading-underline">
            Cookies
          </h4>
          <p>
            We use cookies and log files to enhance your experience. These may
            include session cookies for login, analytics cookies for usage data,
            and third-party cookies from service providers.
          </p>
        </section>

        <section className="mt-4 animate-section">
          <h4 className="fw-semibold text-primary heading-underline">
            Third-Party Links
          </h4>
          <p>
            Our Services may contain links to external websites. We are not
            responsible for the privacy practices or content of those sites.
          </p>
        </section>

        <section className="mt-4 animate-section">
          <h4 className="fw-semibold text-primary heading-underline">
            Changes to This Policy
          </h4>
          <p>
            We may update this Privacy Policy from time to time. Updates will be
            posted on this page with the “Last Updated” date.
          </p>
        </section>

        <section className="mt-4 animate-section">
          <h4 className="fw-semibold text-primary heading-underline">
            Contact Us
          </h4>
          <p>
            For questions regarding this Privacy Policy, please contact us at:{" "}
            <strong>privacy@evidura.in</strong>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

/* ---------------- Extra Styling ---------------- */
const style = document.createElement("style");
style.innerHTML = `
  .animate-fadeIn { animation: fadeIn 0.8s ease-in-out; }
  .animate-section { opacity: 0; transform: translateY(20px); transition: all 0.7s ease; }
  .animate-section.visible { opacity: 1; transform: translateY(0); }
  .heading-underline {
    position: relative;
    display: inline-block;
  }
  .heading-underline::after {
    content: '';
    position: absolute;
    left: 0; bottom: -4px;
    width: 0; height: 3px;
    background-color: #0d6efd;
    transition: width 0.4s ease;
  }
  .heading-underline.visible::after { width: 100%; }
  @keyframes fadeIn { from {opacity:0} to {opacity:1} }
`;
document.head.appendChild(style);


