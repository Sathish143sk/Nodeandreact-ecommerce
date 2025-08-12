import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../pages/ProtectedRoute";
import HomeCartPage from "../componets/HomeCart/HomeCartPage";
import ProfilePage from "../componets/HomeCart/ProfilePage";
const HomeRoutes = () => {
  return (
    <>
      <Route
        path="/user/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <HomeCartPage />
          </ProtectedRoute>
        }
      />
    </>
  );
};

export default HomeRoutes;
