// src/pages/Login.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api, setToken, setRole } from "../utils/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const res = await api.post("/auth/login", { email, password });
      setToken(res.data.token);
      setRole(res.data.user.role);
      const role = res.data.user.role;
      if (role === "police") navigate("/police-dashboard");
      else if (role === "fsl") navigate("/fsl-dashboard");
      else if (role === "court") navigate("/court-dashboard");
      else if (role === "admin") navigate("/admin-dashboard");
      else navigate("/");
    } catch (error) {
      setErr(error.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div
        className="card shadow-lg border-0 p-4 fade-in"
        style={{
          width: 420,
          borderRadius: "14px",
          backgroundColor: "#ffffff",
          color: "#000000",
        }}
      >
        <h3 className="mb-3 text-center fw-bold text-primary">Welcome Back</h3>
        <p className="text-center mb-4 text-muted">
          Please sign in to continue
        </p>

        {err && <div className="alert alert-danger">{err}</div>}

        <form onSubmit={handleLogin}>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control border-0 shadow-sm"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ backgroundColor: "#f1f3f5" }}
            />
            <label htmlFor="email" className="text-secondary">
              Email address
            </label>
          </div>

          <div className="form-floating mb-4">
            <input
              type="password"
              className="form-control border-0 shadow-sm"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ backgroundColor: "#f1f3f5" }}
            />
            <label htmlFor="password" className="text-secondary">
              Password
            </label>
          </div>

          <button
            className="btn btn-primary w-100 py-2 fw-bold"
            type="submit"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4 mb-0 text-muted">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="fw-semibold"
            style={{ color: "#0d6efd", textDecoration: "none" }}
          >
            Register here
          </Link>
        </p>
      </div>

      {/* Animation */}
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

export default Login;








