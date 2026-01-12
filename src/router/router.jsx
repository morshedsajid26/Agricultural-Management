import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import Home from "../pages/admin/Home";
import SopManagement from "../pages/admin/SopManagement";
import UserManagement from "../pages/admin/UserManagement";
// import Home from "../pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/admin/sop/mangement", element: <SopManagement/> },
      { path: "/admin/user/management", element: <UserManagement/> },
      
    ],
  },
]);

export default router;
