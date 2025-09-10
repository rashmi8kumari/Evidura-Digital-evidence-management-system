import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getRole, clearAuth } from "../utils/auth";
import {
  FaBars,
  FaInfoCircle,
  FaUsers,
  FaBook,
  FaPenFancy,
  FaSignInAlt,
  FaUserPlus,
  FaBalanceScale,
  FaMicroscope,
  FaGavel,
  FaUserShield,
  FaUsersCog,
} from "react-icons/fa";
import * as bootstrap from "bootstrap";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const role = getRole();

  const logout = () => {
    clearAuth();
    navigate("/login");
  };

  const closeSidebar = () => {
    const sidebar = document.getElementById("sidebarMenu");
    if (sidebar) {
      const bsOffcanvas = bootstrap.Offcanvas.getInstance(sidebar);
      if (bsOffcanvas) bsOffcanvas.hide();
    }
  };

  const isActive = (path) =>
    location.pathname === path
      ? "active-link"
      : "nav-link-custom";

  return (
    <>
      {/* Top Navbar */}
      <nav
        className="navbar navbar-expand-lg shadow sticky-top"
        style={{
          background: "#243b55", // Bootstrap Blue
        }}
      >
        <div className="container-fluid">
          {/* Sidebar Toggle Button */}
          <button
            className="btn btn-outline-light me-2"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#sidebarMenu"
            aria-controls="sidebarMenu"
          >
            <FaBars />
          </button>

          {/* Brand */}
          <Link
            className="navbar-brand fw-bold text-light"
            to="/"
            style={{
              fontSize: "1.8rem",
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
              letterSpacing: "1px",
            }}
          >
            EVIDURA
          </Link>

          {/* Role + Logout */}
          {role && (
            <div className="d-flex align-items-center">
              <span className="text-light me-3 small">
                Role: <strong className="text-warning">{role}</strong>
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
        style={{ width: "270px" }}
      >
        <div className="offcanvas-header border-bottom">
          <h5 className="offcanvas-title text-info" id="sidebarMenuLabel">
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
            <li className="nav-item mb-1">
              <Link
                className={`nav-link d-flex align-items-center ${isActive("/about")}`}
                to="/about"
                onClick={closeSidebar}
              >
                <FaInfoCircle className="me-2" /> About
              </Link>
            </li>
            <li className="nav-item mb-1">
              <Link
                className={`nav-link d-flex align-items-center ${isActive("/community")}`}
                to="/community"
                onClick={closeSidebar}
              >
                <FaUsers className="me-2" /> Community
              </Link>
              <ul className="ms-4 mt-1">
                <li>
                  <Link
                    className={`nav-link small d-flex align-items-center ${isActive("/community/user-guide")}`}
                    to="/community/user-guide"
                    onClick={closeSidebar}
                  >
                    <FaBook className="me-2" /> User Guide
                  </Link>
                </li>
                <li>
                  <Link
                    className={`nav-link small d-flex align-items-center ${isActive("/community/module-writer")}`}
                    to="/community/module-writer"
                    onClick={closeSidebar}
                  >
                    <FaPenFancy className="me-2" /> Module Writer
                  </Link>
                </li>
              </ul>
            </li>

            <hr className="text-secondary" />

            {/* Auth Links */}
            {!role && (
              <>
                <li className="nav-item mb-1">
                  <Link
                    className={`nav-link d-flex align-items-center ${isActive("/login")}`}
                    to="/login"
                    onClick={closeSidebar}
                  >
                    <FaSignInAlt className="me-2" /> Login
                  </Link>
                </li>
                <li className="nav-item mb-1">
                  <Link
                    className={`nav-link d-flex align-items-center ${isActive("/register")}`}
                    to="/register"
                    onClick={closeSidebar}
                  >
                    <FaUserPlus className="me-2" /> Register
                  </Link>
                </li>
              </>
            )}

            <hr className="text-secondary" />

            {/* Role Based Navigation */}
            {role === "police" && (
              <li className="nav-item mb-1">
                <Link
                  className={`nav-link d-flex align-items-center ${isActive("/police-dashboard")}`}
                  to="/police-dashboard"
                  onClick={closeSidebar}
                >
                  <FaBalanceScale className="me-2" /> Police Dashboard
                </Link>
              </li>
            )}

            {role === "fsl" && (
              <li className="nav-item mb-1">
                <Link
                  className={`nav-link d-flex align-items-center ${isActive("/fsl-dashboard")}`}
                  to="/fsl-dashboard"
                  onClick={closeSidebar}
                >
                  <FaMicroscope className="me-2" /> FSL Dashboard
                </Link>
              </li>
            )}

            {role === "court" && (
              <li className="nav-item mb-1">
                <Link
                  className={`nav-link d-flex align-items-center ${isActive("/court-dashboard")}`}
                  to="/court-dashboard"
                  onClick={closeSidebar}
                >
                  <FaGavel className="me-2" /> Court Dashboard
                </Link>
              </li>
            )}

            {role === "admin" && (
              <>
                <li className="nav-item mb-1">
                  <Link
                    className={`nav-link d-flex align-items-center ${isActive("/admin-dashboard")}`}
                    to="/admin-dashboard"
                    onClick={closeSidebar}
                  >
                    <FaUserShield className="me-2" /> Admin Dashboard
                  </Link>
                </li>
                <li className="nav-item mb-1">
                  <Link
                    className={`nav-link d-flex align-items-center ${isActive("/admin/users")}`}
                    to="/admin/users"
                    onClick={closeSidebar}
                  >
                    <FaUsersCog className="me-2" /> User Management
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>

      {/* Custom CSS */}
      <style>{`
        .nav-link-custom {
          color: #ddd;
          text-decoration: none;
          font-size: 1rem;
          font-weight: 500;
          transition: all 0.3s ease;
        }
        .nav-link-custom:hover {
          color: #00e6e6 !important;
          text-shadow: 0 0 8px #00e6e6;
        }
        .active-link {
          color: #fff !important;
          font-weight: bold;
          text-shadow: 0 0 10px #fff;
        }
        .offcanvas-body ul li {
          margin-bottom: 5px;
        }
      `}</style>
    </>
  );
};

export default Navbar;





