import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import logo from "../assets/logo.jpg";
import { FiUser, FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";
import bgImage from '../assets/background/bg2.jpeg'
import { useProfile } from "../api/hooks/user";

interface DashboardLayoutProps {
  onLogout?: () => void;
}

const DashboardLayout = ({ onLogout }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { data: profileData } = useProfile();

  const userName = profileData ? `${profileData.firstName}` : 'User';
  const userRole = profileData ? `${profileData.role}` : 'Guest';
  const profileImage = profileData ? `${profileData.profileMediaUrl}` : '';

  const handleLogOut = () => {
    if (onLogout) {
      onLogout();
      navigate('/signIn')
    } else {
      console.warn('LogOut function not provided')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow-md border-b border-gray-100 z-40 flex items-center justify-between px-4 sm:px-6">
        <div className="flex items-center space-x-2">
          {/* Mobile menu button */}
          <button
            className="lg:hidden text-gray-700 hover:text-green-600"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>

          <div className="flex items-center text-lg sm:text-xl font-bold text-gray-800">
            <img src={logo} alt="Logo" className="h-8 w-auto sm:h-10 mr-2" />
            <span className="whitespace-nowrap text-sm sm:text-base md:text-lg">
              Food Safety Watch
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3 hover:text-green-600 transition">

          <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-red-100 border-2 border-green-500 text-green-700">
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="w-full h-full object-cover rounded-full" />
            ) : (
              <FiUser className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </div>
          <div className="flex flex-col">
            <p className="text-gray-600 text-xs sm:text-sm font-semibold">
              Name:{" "}
              <span className="font-semibold text-red-400">{userName}</span>
            </p>
            <p className="text-gray-600 text-xs sm:text-sm font-semibold">
              Role: {" "}
              <span className="font-semibold text-green-700">{userRole}</span>
            </p>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex flex-1 pt-16">
        {/* Sidebar (responsive) */}
        <aside
          className={`fixed top-16 bottom-0 bg-white border-r border-gray-200 shadow-sm z-30 transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:w-64 w-64`}
        >
          <Sidebar
            currentPath={location.pathname}
            navigate={(path) => {
              navigate(path);
              setIsSidebarOpen(false);
            }}
            userRole={userRole || ""}
            openLogoutCard={() => setShowConfirm(true)}
          />
        </aside>

        {/* Overlay for mobile when sidebar is open */}
        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          ></div>
        )}

        {/* Page Content */}
        <main
          className={`
    relative flex-1 overflow-hidden h-[calc(100vh-4rem)]
    transition-all duration-300
    ${isSidebarOpen ? "blur-sm lg:blur-0" : ""}
    lg:ml-64
    bg-gray-50 
  `}
        >
          <div className="absolute inset-0 z-0">
            <img
              src={bgImage}
              alt="Background"
              className="w-full h-full object-cover opacity-30"
            />
          </div>
          <div className="relative h-full z-10 p-4 sm:p-6 overflow-y-auto">
            <Outlet />
          </div>

        </main>

        {/* --- Confirm Logout Modal --- */}
        {showConfirm && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-600/60 bg-opacity-1000 z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-80 text-center">
              <h2 className="text-lg font-bold text-gray-800 mb-4">
                Confirm Logout
              </h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to log out?
              </p>

              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
                >
                  Cancel
                </button>

                <button
                  onClick={() => {
                    setShowConfirm(false);
                    handleLogOut();
                  }}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardLayout;
