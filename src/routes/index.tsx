import App from "@/App";
// import AdminLayout from "@/components/layout/AdminLayout";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import About from "@/pages/About";
import { createBrowserRouter } from "react-router";
import VerifyPage from "@/pages/VerifyPage";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { generateRoutes } from "@/utils/generateRoutes";
import { adminSidebarItems } from "./adminSidebarItems";
import { userSidebarItems } from "./userSidebarItems";

const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [{ path: "about", Component: About }],
  },
  // {
  //   Component: AdminLayout,
  //   path: "/admin",
  //   children: [{ path: "analytics", Component: Analytics }],
  // },
  {
    Component: DashboardLayout,
    path: "/admin",
    children: [...generateRoutes(adminSidebarItems)],
  },
  {
    Component: DashboardLayout,
    path: "/user",
    children: [...generateRoutes(userSidebarItems)],
  },
  {
    Component: LoginPage,
    path: "/login",
  },
  {
    Component: RegisterPage,
    path: "/register",
  },
  {
    Component: VerifyPage,
    path: "/verify",
  },
]);

export default router;
