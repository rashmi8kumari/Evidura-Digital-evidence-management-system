import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getRole, clearAuth } from "../utils/auth";
import { FaBars } from "react-icons/fa";
import * as bootstrap from "bootstrap"; // ✅ bootstrap instance import

const Navbar = () => {
  const navigate = useNavigate();
  const role = getRole();

  const logout = () => {
    clearAuth();
    navigate("/login");
  };

  // Sidebar close helper
  const closeSidebar = () => {
    const sidebar = document.getElementById("sidebarMenu");
    if (sidebar) {
      const bsOffcanvas = bootstrap.Offcanvas.getInstance(sidebar);
      if (bsOffcanvas) bsOffcanvas.hide();
    }
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
                Role: <strong>{role}</strong>
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
        style={{ width: "260px" }}
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

            {/* General Pages */}
            <li className="nav-item mb-2">
              <Link
                className="nav-link text-white"
                to="/about"
                onClick={closeSidebar}   // ✅ Sidebar close
              >
                📖 About
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link
                className="nav-link text-white"
                to="/community"
                onClick={closeSidebar}
              >
                🤝 Community Support
              </Link>
              <ul className="ms-3 mt-1">
                <li>
                  <Link
                    className="nav-link text-light small"
                    to="/community/user-guide"
                    onClick={closeSidebar}
                  >
                    📘 User Guide
                  </Link>
                </li>
                <li>
                  <Link
                    className="nav-link text-light small"
                    to="/community/module-writer"
                    onClick={closeSidebar}
                  >
                    📝 Module Writer Guide
                  </Link>
                </li>
              </ul>
            </li>

            {/* Auth Links */}
            {!role && (
              <>
                <li className="nav-item mb-2">
                  <Link
                    className="nav-link text-white"
                    to="/login"
                    onClick={closeSidebar}
                  >
                    🔑 Login
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link
                    className="nav-link text-white"
                    to="/register"
                    onClick={closeSidebar}
                  >
                    📝 Register
                  </Link>
                </li>
              </>
            )}

            {/* Role Based */}
            {role === "police" && (
              <li className="nav-item mb-2">
                <Link
                  className="nav-link text-white"
                  to="/police-dashboard"
                  onClick={closeSidebar}
                >
                  🚔 Police Dashboard
                </Link>
              </li>
            )}

            {role === "fsl" && (
              <li className="nav-item mb-2">
                <Link
                  className="nav-link text-white"
                  to="/fsl-dashboard"
                  onClick={closeSidebar}
                >
                  🧪 FSL Dashboard
                </Link>
              </li>
            )}

            {role === "court" && (
              <li className="nav-item mb-2">
                <Link
                  className="nav-link text-white"
                  to="/court-dashboard"
                  onClick={closeSidebar}
                >
                  ⚖️ Court Dashboard
                </Link>
              </li>
            )}

            {role === "admin" && (
              <>
                <li className="nav-item mb-2">
                  <Link
                    className="nav-link text-white"
                    to="/admin-dashboard"
                    onClick={closeSidebar}
                  >
                    🛠️ Admin Dashboard
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link
                    className="nav-link text-white"
                    to="/admin/users"
                    onClick={closeSidebar}
                  >
                    👥 User Management
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










