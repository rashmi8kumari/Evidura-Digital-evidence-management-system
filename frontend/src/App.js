// src/App.js
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import PoliceDashboard from "./pages/PoliceDashboard";
import FSLDashboard from "./pages/FSLDashboard";
import CourtDashboard from "./pages/CourtDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import EvidenceDetails from "./pages/EvidenceDetails";


function App() {
  return (
    <>
      <Navbar />
      <div className="container my-4">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

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
                <AdminDashboard />
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
    </>
  );
}

export default App;
