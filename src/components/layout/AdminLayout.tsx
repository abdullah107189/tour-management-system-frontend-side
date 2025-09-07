import { Outlet } from "react-router";

const AdminLayout = () => {
  return (
    <div>
        admin navbar here
      <Outlet></Outlet>
    </div>
  );
};

export default AdminLayout;
