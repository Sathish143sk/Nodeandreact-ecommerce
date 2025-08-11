import { Route } from "react-router-dom";
import AdminLogin from "../pages/admin/AdminLogin";
import AdminRegister from "../pages/admin/AdminRegister";
import AdminDashboard from "../pages/admin/AdminDashboard";
import CategoryPage from "../pages/admin/AdminCatagery/CategoryPage";
import ProductsPage from "../pages/admin/AdminProduct/ProductsPage";
import UserPage from "../pages/admin/AdminPublicUser/UserList";
const AdminRoutes = () => (
  <>
    <Route path="/admin/login" element={<AdminLogin />} />
    <Route path="/admin/register" element={<AdminRegister />} />
    <Route path="/admin/dashboard" element={<AdminDashboard />} />
    <Route path="/admin/category" element={<CategoryPage />} />
    <Route path="/admin/products" element={<ProductsPage />} />
    <Route path="/admin/users" element={<UserPage />} />
  </>
);

export default AdminRoutes;
