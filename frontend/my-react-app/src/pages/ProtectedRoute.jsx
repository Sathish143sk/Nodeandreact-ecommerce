// src/routes/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("userToken"); // Or your auth state
  return token ? children : <Navigate to="/user/login" replace />;
};

export default ProtectedRoute;
