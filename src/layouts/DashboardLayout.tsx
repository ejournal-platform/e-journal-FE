import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar on the left */}
      <Sidebar currentPath={location.pathname} navigate={navigate} userRole={""} />

      {/* Page content (changes when you click sidebar links) */}
      <main className="flex-1 p-6">
        <Outlet />  {/* This is where child pages load */}
      </main>
    </div>
  );
};

export default DashboardLayout;
