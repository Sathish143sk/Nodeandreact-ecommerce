import { Route } from "react-router-dom";
import UserLogin from "../pages/user/LoginPage";
import UserRegister from "../pages/user/RegisterPage";
// import UserDashboard from "../pages/user/UserDashboard";

const UserRoutes = () => (
  <>
    <Route path="/user/login" element={<UserLogin />} />
    <Route path="/user/register" element={<UserRegister />} />
    {/* <Route path="/user/dashboard" element={<UserDashboard />} /> */}
  </>
);

export default UserRoutes;
