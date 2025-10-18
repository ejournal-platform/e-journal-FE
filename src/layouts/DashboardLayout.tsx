import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import logo from "../assets/logo.png";
import { FiUser } from "react-icons/fi";
import { useState } from "react";
import type { UserRole } from "../components/ui/Input";

interface DashboardLayoutProps {
  nic?: string;
  role: UserRole;
}

const DashboardLayout = ({ nic, role }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [user] = useState({
    name: nic || "User",
    role: role,
  });

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">

      {/* Fixed Header (Full Width) */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow-md border-b border-gray-100 z-30 flex items-center justify-between px-6">
        <div className="flex items-center text-lg sm:text-xl font-bold text-gray-800">
          <img src={logo} alt="Logo" className="h-10 w-auto mr-2" />
          <span className="whitespace-nowrap">Food Safety Watch</span>
        </div>

        <div
          className="flex items-center space-x-3 cursor-pointer hover:text-green-600 transition"
          onClick={handleProfileClick}
        >
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-100 border-2 border-green-500 text-green-700">
            <FiUser className="w-5 h-5" />
          </div>
          <p className="text-gray-600 text-xs sm:text-sm">
            Role:{" "}
            <span className="font-semibold text-green-700">{user.role}</span>
          </p>
        </div>
      </header>

      {/* Main Body (Sidebar + Content) */}
      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <aside className={"fixed top-16 left-0 w-64 bottom-0 bg-white border-r border-gray-200 shadow-sm z-30 overflow-hidden"}>
          <div className="h-full w-full max-w-full">
            <Sidebar
              currentPath={location.pathname}
              navigate={navigate}
              userRole={user.role || ''}
            />
          </div>
        </aside>
        {/* Page Content */}
        <main className="flex-1 ml-64 p-6 overflow-y-auto h-[calc(100vh-4rem)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
