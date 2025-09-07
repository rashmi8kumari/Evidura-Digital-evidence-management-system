// src/pages/Register.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
      setOk("✅ Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      setErr(error.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center bg-light">
      <div className="card shadow-lg p-4 rounded-4" style={{ width: 460 }}>
        <h3 className="mb-3 text-center text-success fw-bold">
          Create an Account
        </h3>
        <p className="text-center text-muted mb-4">
          Fill in the details below to register
        </p>

        {err && <div className="alert alert-danger">{err}</div>}
        {ok && <div className="alert alert-success">{ok}</div>}

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

          <button className="btn btn-success w-100 fw-semibold" type="submit">
            Register
          </button>
        </form>

        <p className="text-center mt-3 mb-0">
          Already have an account?{" "}
          <a href="/login" className="text-decoration-none fw-semibold">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;



