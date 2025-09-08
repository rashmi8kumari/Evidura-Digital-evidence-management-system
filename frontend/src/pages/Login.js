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
      style={{ minHeight: "100vh" }} // full screen height for perfect centering
    >
      <div
        className="card shadow-lg border-0 p-4"
        style={{
          width: 420,
          borderRadius: "12px",
          backgroundColor: "#2f2f2f",
          color: "#fff",
        }}
      >
        <h3 className="mb-3 text-center fw-bold text-info">Sign In</h3>
        <p className="text-center mb-4" style={{ color: "#ffffff" }}>
          Enter your credentials to access the system
        </p>

        {err && <div className="alert alert-danger">{err}</div>}

        <form onSubmit={handleLogin}>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control bg-dark text-light border-0"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="email" className="text-secondary">
              Email address
            </label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control bg-dark text-light border-0"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="password" className="text-secondary">
              Password
            </label>
          </div>

          <button
            className="btn btn-info w-100 py-2 fw-bold text-dark"
            type="submit"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-3 mb-0">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="fw-semibold"
            style={{ color: "#0dcaf0", textDecoration: "none" }}
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;







