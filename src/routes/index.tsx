import App from "@/App";
// import AdminLayout from "@/components/layout/AdminLayout";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import About from "@/pages/About";
import { createBrowserRouter, Navigate } from "react-router";
import VerifyPage from "@/pages/VerifyPage";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { generateRoutes } from "@/utils/generateRoutes";
import { adminSidebarItems } from "./adminSidebarItems";
import { userSidebarItems } from "./userSidebarItems";
import { withAuth } from "@/utils/withAuth";
import { role } from "@/constants/role";
import type { TRole } from "@/types";

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
    Component: withAuth(DashboardLayout, [
      role.admin,
      role.superAdmin,
    ] as TRole[]),
    path: "/admin",
    children: [
      { index: true, element: <Navigate to={"/admin/analytics"}></Navigate> },
      ...generateRoutes(adminSidebarItems),
    ],
  },
  {
    Component: withAuth(DashboardLayout, [role.user] as TRole[]),
    path: "/user",
    children: [
      { index: true, element: <Navigate to={"/user/bookings"}></Navigate> },
      ...generateRoutes(userSidebarItems),
    ],
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
  {
    element: <h1>unauthorized access</h1>,
    path: "/unauthorized",
  },
]);

export default router;
