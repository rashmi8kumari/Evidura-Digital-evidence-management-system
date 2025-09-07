// src/App.js
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";   // ✅ New Footer
import PrivateRoute from "./components/PrivateRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import PoliceDashboard from "./pages/PoliceDashboard";
import FSLDashboard from "./pages/FSLDashboard";
import CourtDashboard from "./pages/CourtDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import UserManagement from "./pages/UserManagement";
import EvidenceDetails from "./pages/EvidenceDetails";

// 🔹 General pages
import About from "./pages/About";
import Community from "./pages/Community";
import UserGuide from "./pages/UserGuide";
import ModuleWriterGuide from "./pages/ModuleWriterGuide";

// 🔹 Footer linked pages
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Contact from "./pages/Contact";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <div className="container my-4 flex-grow-1">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* General Pages */}
          <Route path="/about" element={<About />} />
          <Route path="/community" element={<Community />} />
          <Route path="/community/user-guide" element={<UserGuide />} />
          <Route path="/community/module-writer" element={<ModuleWriterGuide />} />

          {/* Footer Pages */}
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/contact" element={<Contact />} />

          {/* Protected routes */}
          <Route
            path="/police-dashboard"
            element={
              <PrivateRoute allowedRoles={["police"]}>
                <PoliceDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/fsl-dashboard"
            element={
              <PrivateRoute allowedRoles={["fsl"]}>
                <FSLDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/court-dashboard"
            element={
              <PrivateRoute allowedRoles={["court"]}>
                <CourtDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                {/* Admin Dashboard + User Management shortcut */}
                <div>
                  <AdminDashboard />
                  <div className="text-center mt-4">
                    <a
                      href="/admin/users"
                      className="btn btn-lg btn-outline-primary"
                    >
                      Go to User Management
                    </a>
                  </div>
                </div>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <UserManagement />
              </PrivateRoute>
            }
          />

          <Route
            path="/evidence/:id"
            element={
              <PrivateRoute allowedRoles={["police", "fsl", "court", "admin"]}>
                <EvidenceDetails />
              </PrivateRoute>
            }
          />

          {/* fallback */}
          <Route
            path="*"
            element={<h3 className="text-center">404 - Page not found</h3>}
          />
        </Routes>
      </div>

      <Footer /> {/* ✅ Sticky Footer */}
    </div>
  );
}

export default App;



