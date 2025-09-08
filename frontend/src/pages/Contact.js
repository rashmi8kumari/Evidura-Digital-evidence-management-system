import React, { useState } from "react";

const ContactUs = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    jobTitle: "",
    organization: "",
    email: "",
    country: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form), // ✅ yaha form bhejna hai
      });

      const data = await response.json();
      if (data.success) {
        alert("✅ Message sent successfully!");
        setForm({
          firstName: "",
          lastName: "",
          jobTitle: "",
          organization: "",
          email: "",
          country: "",
          message: "",
        });
      } else {
        alert("⚠️ " + data.error);
      }
    } catch (error) {
      alert("❌ Failed to send message.");
    }
  };

  return (
    <div
      className="text-white"
      style={{
        background: "linear-gradient(135deg, #001F3F, #003366)",
        minHeight: "100vh",
        padding: "60px 0",
      }}
    >
      <div className="container">
        <h1 className="fw-bold text-center mb-5">Contact Us</h1>
        <div className="row">
          {/* Left Side - Office Info */}
          <div className="col-md-5 mb-4">
            <h4>Office</h4>
            <p>
              We operate out of our office located in{" "}
              <strong>Indore, Madhya Pradesh</strong>.
            </p>
            <p>
              <a
                href="https://www.google.com/maps/place/Vijay+Nagar,+Indore,+Madhya+Pradesh/"
                target="_blank"
                rel="noreferrer"
                className="text-info text-decoration-none"
              >
                Vijay Nagar, Indore, <br />
                Madhya Pradesh, 452010
              </a>
            </p>
            <p>
              <strong>Phone:</strong>{" "}
              <a
                href="tel:+917974193567"
                className="text-info text-decoration-none"
              >
                +91-797-419-3567 , +91-722-302-2165
              </a>
            </p>
            <a
              href="https://www.google.com/maps/dir//Vijay+Nagar,+Indore,+Madhya+Pradesh/"
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline-light mb-4"
            >
              DIRECTIONS
            </a>

            <h5>General Inquiries</h5>
            <p>
              Email:{" "}
              <a
                href="mailto:info@evidura.in"
                className="text-info text-decoration-none"
              >
                info@evidura.in
              </a>
            </p>
            <p>Or fill out the form on this page</p>
          </div>

          {/* Right Side - Form */}
          <div className="col-md-7">
            <div className="card p-4 shadow-lg" style={{ borderRadius: "12px" }}>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name*"
                      className="form-control"
                      value={form.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name*"
                      className="form-control"
                      value={form.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    name="jobTitle"
                    placeholder="Job Title*"
                    className="form-control"
                    value={form.jobTitle}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    name="organization"
                    placeholder="Organization*"
                    className="form-control"
                    value={form.organization}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    name="email"
                    placeholder="Business Email*"
                    className="form-control"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    name="country"
                    placeholder="Country*"
                    className="form-control"
                    value={form.country}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    name="message"
                    placeholder="How can we help you?*"
                    className="form-control"
                    rows="4"
                    value={form.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary px-4">
                    SUBMIT
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;


