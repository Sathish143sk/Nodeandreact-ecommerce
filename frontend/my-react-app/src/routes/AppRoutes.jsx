import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import AdminRoutes from "./AdminRoutes";
import UserRoutes from "./UserRoutes";
import HomeRoutes from "./HomeRoutes";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {HomeRoutes()}
      {/* Admin Routes */}
      {AdminRoutes()}
      {/* User Routes */}
      {UserRoutes()}
    </Routes>
  );
};

export default AppRoutes;
