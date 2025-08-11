import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import AdminRoutes from "./AdminRoutes";
import UserRoutes from "./UserRoutes";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Admin Routes */}
      {AdminRoutes()}
      {/* User Routes */}
      {UserRoutes()}
    </Routes>
  );
};

export default AppRoutes;
