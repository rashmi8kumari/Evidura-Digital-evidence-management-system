// src/components/Navbar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getRole, clearAuth } from "../utils/auth";
import { FaBars, FaUserShield, FaUsers, FaGavel, FaMicroscope, FaUserTie } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const role = getRole();

  const logout = () => {
    clearAuth();
    navigate("/login");
  };

  return (
    <>
      {/* Top Navbar */}
      <nav className="navbar navbar-dark bg-dark shadow-sm">
        <div className="container-fluid">
          <button
            className="btn btn-outline-light me-2"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#sidebarMenu"
            aria-controls="sidebarMenu"
          >
            <FaBars />
          </button>
          <Link className="navbar-brand fw-bold" to="/">
            Evidence Tracker
          </Link>
          {role && (
            <div className="d-flex align-items-center">
              <span className="text-light me-3">
                Role: <strong className="text-capitalize">{role}</strong>
              </span>
              <button className="btn btn-sm btn-danger" onClick={logout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Offcanvas Sidebar */}
      <div
        className="offcanvas offcanvas-start bg-dark text-white"
        tabIndex="-1"
        id="sidebarMenu"
        aria-labelledby="sidebarMenuLabel"
        style={{ width: "250px" }}
      >
        <div className="offcanvas-header border-bottom">
          <h5 className="offcanvas-title" id="sidebarMenuLabel">
            Navigation
          </h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="nav flex-column">

            {/* Guest Links */}
            {!role && (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/login" data-bs-dismiss="offcanvas">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/register" data-bs-dismiss="offcanvas">
                    Register
                  </Link>
                </li>
              </>
            )}

            {/* Police */}
            {role === "police" && (
              <li className="nav-item">
                <Link className="nav-link text-white" to="/police-dashboard" data-bs-dismiss="offcanvas">
                  <FaUserShield className="me-2" /> Police Dashboard
                </Link>
              </li>
            )}

            {/* FSL */}
            {role === "fsl" && (
              <li className="nav-item">
                <Link className="nav-link text-white" to="/fsl-dashboard" data-bs-dismiss="offcanvas">
                  <FaMicroscope className="me-2" /> FSL Dashboard
                </Link>
              </li>
            )}

            {/* Court */}
            {role === "court" && (
              <li className="nav-item">
                <Link className="nav-link text-white" to="/court-dashboard" data-bs-dismiss="offcanvas">
                  <FaGavel className="me-2" /> Court Dashboard
                </Link>
              </li>
            )}

            {/* Admin */}
            {role === "admin" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/admin-dashboard" data-bs-dismiss="offcanvas">
                    <FaUserTie className="me-2" /> Admin Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/admin/users" data-bs-dismiss="offcanvas">
                    <FaUsers className="me-2" /> User Management
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;







