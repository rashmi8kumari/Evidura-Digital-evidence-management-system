// src/pages/Register.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../utils/auth";

const roles = [
  { value: "police", label: "POLICE" },
  { value: "fsl", label: "FSL LAB" },
  { value: "court", label: "COURT" },
  { value: "admin", label: "ADMIN" },
];

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "police",
  });
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    setErr("");
    setOk("");
    try {
      await api.post("/auth/register", form);
      setOk("Registration successful! Redirecting...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      setErr(error.response?.data?.msg || "Registration failed ❌");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }} // ✅ no background here
    >
      {/* Card only */}
      <div
        className="card shadow-lg border-0 p-4"
        style={{
          maxWidth: "420px",
          width: "100%",
          borderRadius: "12px",
          backgroundColor: "#fff", // card white
          color: "#000", // text black
        }}
      >
        <h3 className="mb-2 text-center fw-bold text-success">
          Create an Account
        </h3>
        <p className="text-center mb-4 text-muted">
          Fill in your details to register
        </p>

        {err && <div className="alert alert-danger py-2">{err}</div>}
        {ok && <div className="alert alert-success py-2">{ok}</div>}

        <form onSubmit={handleRegister}>
          <div className="form-floating mb-3">
            <input
              name="name"
              className="form-control"
              id="name"
              placeholder="Full Name"
              value={form.name}
              onChange={onChange}
              required
            />
            <label htmlFor="name">Full Name</label>
          </div>

          <div className="form-floating mb-3">
            <input
              name="email"
              type="email"
              className="form-control"
              id="email"
              placeholder="Email"
              value={form.email}
              onChange={onChange}
              required
            />
            <label htmlFor="email">Email</label>
          </div>

          <div className="form-floating mb-3">
            <input
              name="password"
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              value={form.password}
              onChange={onChange}
              required
            />
            <label htmlFor="password">Password</label>
          </div>

          <div className="form-floating mb-4">
            <select
              name="role"
              className="form-select"
              id="role"
              value={form.role}
              onChange={onChange}
            >
              {roles.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
            <label htmlFor="role">Select Role</label>
          </div>

          <button
            className="btn btn-success w-100 fw-semibold py-2"
            type="submit"
          >
            Register
          </button>
        </form>

        <p className="text-center mt-3 mb-0">
          Already have an account?{" "}
          <Link
            to="/login"
            className="fw-semibold"
            style={{ color: "#0dcaf0", textDecoration: "none" }}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;













