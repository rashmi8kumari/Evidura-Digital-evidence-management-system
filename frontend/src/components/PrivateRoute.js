// src/components/PrivateRoute.js
import React from "react";
import { getToken, getRole } from "../utils/auth";
import { Navigate } from "react-router-dom";

/**
 * Wrap a protected route:
 * <PrivateRoute allowedRoles={["police","admin"]}><Component/></PrivateRoute>
 */
const PrivateRoute = ({ children, allowedRoles = [] }) => {
  const token = getToken();
  const role = getRole();

  if (!token) return <Navigate to="/login" replace />;

  if (allowedRoles && allowedRoles.length > 0) {
    if (!allowedRoles.includes(role)) {
      // user authenticated but wrong role
      return <div className="alert alert-danger">Access denied — insufficient permissions.</div>;
    }
  }

  return children;
};

export default PrivateRoute;
