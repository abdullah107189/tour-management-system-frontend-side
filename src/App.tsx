import { Outlet } from "react-router";
import "./App.css";
import CommonLayout from "./components/layout/CommonLayout";
import { generateRoutes } from "./utils/generateRoutes";
import { adminSidebarItems } from "./routes/adminSidebarItems";
function App() {
  console.log(generateRoutes(adminSidebarItems));
  return (
    <CommonLayout>
      <Outlet></Outlet>
    </CommonLayout>
  );
}

export default App;
