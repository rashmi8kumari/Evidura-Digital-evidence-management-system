// src/pages/Register.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../utils/auth";

const roles = [
  { value: "police", label: "Police" },
  { value: "fsl", label: "FSL Lab" },
  { value: "court", label: "Court" },
  { value: "admin", label: "Admin" },
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
      setOk("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      setErr(error.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div
        className="card shadow-lg border-0 p-4"
        style={{
          width: "100%",
          maxWidth: "340px", // aur chhota box
          borderRadius: "12px",
          backgroundColor: "#3a3a3a", // grey background
          color: "#fff",
        }}
      >
        <h4 className="mb-3 text-center fw-bold text-success">
          Create an Account
        </h4>
        <p className="text-center mb-4" style={{ color: "#e0e0e0" }}>
          Fill in the details to register
        </p>

        {err && <div className="alert alert-danger">{err}</div>}
        {ok && <div className="alert alert-success">{ok}</div>}

        <form onSubmit={handleRegister}>
          <div className="form-floating mb-3">
            <input
              name="name"
              className="form-control bg-dark text-light border-0"
              id="name"
              placeholder="Full Name"
              value={form.name}
              onChange={onChange}
              required
            />
            <label htmlFor="name" className="text-secondary">
              Full Name
            </label>
          </div>

          <div className="form-floating mb-3">
            <input
              name="email"
              type="email"
              className="form-control bg-dark text-light border-0"
              id="email"
              placeholder="Email"
              value={form.email}
              onChange={onChange}
              required
            />
            <label htmlFor="email" className="text-secondary">
              Email
            </label>
          </div>

          <div className="form-floating mb-3">
            <input
              name="password"
              type="password"
              className="form-control bg-dark text-light border-0"
              id="password"
              placeholder="Password"
              value={form.password}
              onChange={onChange}
              required
            />
            <label htmlFor="password" className="text-secondary">
              Password
            </label>
          </div>

          <div className="form-floating mb-4">
            <select
              name="role"
              className="form-select bg-dark text-light border-0"
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
            <label htmlFor="role" className="text-secondary">
              Select Role
            </label>
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







