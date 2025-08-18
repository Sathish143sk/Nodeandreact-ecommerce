import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../pages/ProtectedRoute";
import HomeCartPage from "../componets/HomeCart/HomeCartPage";
import ProfilePage from "../componets/HomeCart/ProfilePage";
import PlaceOrder from "../componets/HomeCart/PlaceOrder";
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
      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <PlaceOrder />
          </ProtectedRoute>
        }
      />
    </>
  );
};

export default HomeRoutes;
