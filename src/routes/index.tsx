import App from "@/App";
import AdminLayout from "@/components/layout/AdminLayout";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import About from "@/pages/About";
import Analytics from "@/pages/adminPage/Analytics";
import { createBrowserRouter } from "react-router";
import VerifyPage from "@/pages/VerifyPage";

const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [{ path: "about", Component: About }],
  },
  {
    Component: AdminLayout,
    path: "/admin",
    children: [{ path: "analytics", Component: Analytics }],
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
