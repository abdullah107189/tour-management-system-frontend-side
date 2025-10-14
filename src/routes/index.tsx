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
import NotFound from "@/pages/User/NotFound";
import HeroSection from "@/components/modules/home/HeroSection";
import { TourDetails } from "@/pages/Tour/TourDetails";
import { Tours } from "@/pages/Tour/Tours";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: HeroSection,
      },
      { path: "about", Component: About },
      {
        Component: Tours,
        path: "/tours",
      },
      {
        Component: TourDetails,
        path: "/tour-details/:slug",
      },
    ],
  },
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
  {
    path: "*",
    Component: NotFound,
  },
]);

export default router;
