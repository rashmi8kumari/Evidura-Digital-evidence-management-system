import React, { useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaBalanceScale, FaUserShield, FaMicroscope, FaGavel, FaUsers } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import "animate.css";

function About() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <Container className="my-5">
      <Card
        className="shadow-lg border-0 p-4 animate__animated animate__fadeIn"
        style={{ backgroundColor: "#2f2f2f", color: "#fff", borderRadius: "15px" }}
      >
        <h2 className="mb-3 text-primary fw-bold text-center" data-aos="fade-up">
          About Evidura
        </h2>

        <p data-aos="fade-up" data-aos-delay="200">
          <strong>Evidura</strong> is a state-of-the-art digital platform designed to monitor,
          manage, and streamline the flow of criminal case evidence across the entire judicial
          ecosystem—including Police, FSL (Forensic Science Lab), and Court.
        </p>

        {/* Vision Section */}
        <h4 className="mt-4 text-info" data-aos="fade-right">
          Purpose and Vision
        </h4>
        <p data-aos="fade-right" data-aos-delay="200">
          Traditional processes often suffer from delays, misplaced documents, and lack of
          coordination. Evidura modernizes this workflow, reducing errors, improving traceability,
          and accelerating judicial decisions.
        </p>

        {/* Key Features Section */}
        <h4 className="mt-4 text-info" data-aos="zoom-in">
          Key Features
        </h4>
        <Row className="g-3" data-aos="zoom-in" data-aos-delay="200">
          {[
            "Role-based dashboards for Police, FSL, Court, and Admin.",
            "Secure evidence entry and custody tracking.",
            "Real-time status updates.",
            "Digital evidence transfer between departments.",
            "Upload forensic reports and attach files.",
            "Audit logs for full transparency.",
            "Pagination, filters, and search.",
          ].map((feature, i) => (
            <Col md={6} key={i}>
              <Card className="bg-dark text-white border-0 shadow-sm p-3 h-100">
                <FaUserShield className="text-primary me-2" />
                {feature}
              </Card>
            </Col>
          ))}
        </Row>

        {/* Roles Section */}
        <h4 className="mt-5 text-info" data-aos="fade-left">
          Roles and Responsibilities
        </h4>
        <Row className="g-4 mt-2">
          <Col md={6} data-aos="fade-left" data-aos-delay="200">
            <Card className="bg-secondary text-white border-0 shadow-sm p-3 h-100">
              <FaBalanceScale className="text-warning fs-3 mb-2" />
              <strong>Police:</strong> Record new evidence, track cases, and transfer to FSL/Court.
            </Card>
          </Col>
          <Col md={6} data-aos="fade-left" data-aos-delay="300">
            <Card className="bg-secondary text-white border-0 shadow-sm p-3 h-100">
              <FaMicroscope className="text-danger fs-3 mb-2" />
              <strong>FSL Lab:</strong> Analyze evidence, upload reports, return to Police/Court.
            </Card>
          </Col>
          <Col md={6} data-aos="fade-left" data-aos-delay="400">
            <Card className="bg-secondary text-white border-0 shadow-sm p-3 h-100">
              <FaGavel className="text-success fs-3 mb-2" />
              <strong>Court:</strong> Review evidence, access forensic reports, and decide cases.
            </Card>
          </Col>
          <Col md={6} data-aos="fade-left" data-aos-delay="500">
            <Card className="bg-secondary text-white border-0 shadow-sm p-3 h-100">
              <FaUsers className="text-primary fs-3 mb-2" />
              <strong>Admin:</strong> Manage users, assign roles, and oversee workflow.
            </Card>
          </Col>
        </Row>

        {/* Security Section */}
        <h4 className="mt-5 text-info" data-aos="flip-left">
          Security and Privacy
        </h4>
        <p data-aos="flip-left" data-aos-delay="200">
          Evidura employs encrypted storage, secure authentication, and strict role-based access
          control. Only authorized personnel can access sensitive data, ensuring compliance with
          legal standards.
        </p>

        {/* Benefits Section */}
        <h4 className="mt-4 text-info" data-aos="zoom-in-up">
          Benefits
        </h4>
        <ul data-aos="zoom-in-up" data-aos-delay="200">
          <li>Reduces delays in case handling.</li>
          <li>Minimizes manual tracking errors.</li>
          <li>Improves accountability and transparency.</li>
          <li>Provides a reliable audit trail for legal use.</li>
          <li>Enhances collaboration between Police, FSL, and Court.</li>
        </ul>

        {/* Conclusion */}
        <h4 className="mt-4 text-info" data-aos="fade-up">
          Conclusion
        </h4>
        <p data-aos="fade-up" data-aos-delay="200">
          Evidura is not just a tool—it’s a secure, reliable, and efficient digital solution for
          evidence management, bridging gaps between departments and ensuring faster justice.
        </p>
      </Card>
    </Container>
  );
}

export default About;



