import App from "@/App";
import AdminLayout from "@/components/layout/AdminLayout";
import LoginPage from "@/pages/Login";
import RegisterPage from "@/pages/Register";
import About from "@/pages/About";
import Analytics from "@/pages/adminPage/Analytics";
import { createBrowserRouter } from "react-router";

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
    Component: RegisterPage,
    path: "/verify",
  },
]);

export default router;
