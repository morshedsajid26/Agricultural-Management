import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import Home from "../pages/admin/Home";
import SopManagement from "../pages/admin/SopManagement";
import UserManagement from "../pages/admin/UserManagement";
import AddUser from "../pages/admin/AddUser";
import TaskOversight from "../pages/admin/TaskOversight";
import AddSOP from "../pages/admin/AddSOP";
import Messaging from "../pages/admin/Messaging";
import Settings from "../pages/admin/Settings";
import Subscription from "../pages/admin/Subscription";
import Dashboard from "../pages/owner/Dashboard";
import SystemSettings from "../pages/owner/SyetemSettings";
import SubscriptionPlans from "../pages/owner/SubscriptionPlans";
import FarmManagement from "../pages/owner/FarmManagement";
import FarmDetails from "../pages/owner/FarmDetails";
import CreateFarm from "../pages/owner/CreateFarm";
// import Home from "../pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      { path: "/admin/home", element: <Home /> },
      { path: "/admin/sop/management", element: <SopManagement/> },
      { path: "/admin/user/management", element: <UserManagement/> },
      { path: "/admin/user/management/add/user", element: <AddUser/> },
      { path: "/admin/task/oversight", element: <TaskOversight/> },
      { path: "/admin/sop/management/upload/sop", element: <AddSOP/> },
      { path: "/admin/messaging/oversight", element: <Messaging/> },
      { path: "/admin/farm/settings", element: <Settings/> },
      { path: "/admin/subscription", element: <Subscription/> },


      { path: "/owner/dashboard", element: <Dashboard /> },
      { path: "/owner/farm/management", element: <FarmManagement /> },
      { path: "/owner/farm/management/details/:id", element: <FarmDetails /> },
      {path: "/owner/farm/management/create/farm", element: <CreateFarm/>},
      { path: "/owner/subscription/plans", element: <SubscriptionPlans/> },
      { path: "/owner/system/settings/", element: <SystemSettings /> },
    ],
  },
]);

export default router;
