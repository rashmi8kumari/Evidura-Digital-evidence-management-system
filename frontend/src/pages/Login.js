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
    <div className="d-flex vh-100 justify-content-center align-items-center bg-gradient">
      <div
        className="card shadow-lg border-0 p-4"
        style={{
          width: 420,
          borderRadius: "12px",
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(10px)",
        }}
      >
        <h3 className="mb-3 text-center fw-bold text-primary">🔐 Sign In</h3>
        <p className="text-muted text-center mb-4">
          Enter your credentials to access the system
        </p>

        {err && <div className="alert alert-danger">{err}</div>}

        <form onSubmit={handleLogin}>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="email">Email address</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="password">Password</label>
          </div>

          <button className="btn btn-primary w-100 py-2 fw-bold" type="submit">
            Login
          </button>
        </form>

        <p className="text-center mt-3 mb-0">
          Don’t have an account?{" "}
          <Link to="/register" className="text-decoration-none fw-semibold">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;




