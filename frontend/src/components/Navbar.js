// src/components/Navbar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getRole, clearAuth } from "../utils/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const role = getRole();

  const logout = () => {
    clearAuth();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Evidence Tracker</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navmenu">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navmenu">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {!role && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
              </>
            )}
            {role === "police" && (
              <li className="nav-item">
                <Link className="nav-link" to="/police-dashboard">Police Dashboard</Link>
              </li>
            )}
            {role === "fsl" && (
              <li className="nav-item">
                <Link className="nav-link" to="/fsl-dashboard">FSL Dashboard</Link>
              </li>
            )}
            {role === "court" && (
              <li className="nav-item">
                <Link className="nav-link" to="/court-dashboard">Court Dashboard</Link>
              </li>
            )}
            {role === "admin" && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin-dashboard">Admin</Link>
              </li>
            )}
          </ul>

          <div className="d-flex">
            {role ? (
              <>
                <span className="navbar-text text-light me-3">Role: <strong>{role}</strong></span>
                <button className="btn btn-outline-light btn-sm" onClick={logout}>Logout</button>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


