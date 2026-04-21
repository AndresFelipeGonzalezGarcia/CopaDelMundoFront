import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div className="min-h-screen bg-[#f4f4f4]">
      <Outlet />
    </div>
  );
};
