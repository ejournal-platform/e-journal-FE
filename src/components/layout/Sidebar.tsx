import { useState } from "react";
import { FiLogOut, FiSettings } from "react-icons/fi";
import { MdAssignment, MdCampaign, MdLibraryBooks, MdGroups } from "react-icons/md";

interface SidebarProps {
  userRole: string;
  currentPath: string;
  navigate: (path: string) => void;
  openLogoutCard?: () => void;
}

const navItems = [
  { name: "Community", icon: MdGroups, path: "/dashboard/community" },
  { name: "E-Journal", icon: MdLibraryBooks, path: "/dashboard/upload" },
  { name: "My Submissions", icon: MdAssignment, path: "/dashboard/submissions" },
  { name: "Announcements", icon: MdCampaign, path: "/dashboard/announcements" },
];

const Sidebar = ({ currentPath, navigate, openLogoutCard }: SidebarProps) => {

  const handleProfileClick = () => {
    navigate("/dashboard/profile");
  };

  const isProfileActive = currentPath === '/dashboard/profile'

  return (
    <>
      <aside className="flex flex-col w-64 bg-white border-r border-gray-200 p-6 min-h-screen sticky top-0">
        {/* Header */}
        <div className=" justify-center ">
          <div className="mb-4 bg-green-600 p-2 rounded-lg text-center">
            <h1 className="text-lg font-semibold text-white">Dashboard</h1>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-grow space-y-2 font-semibold">
          {navItems.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className={`flex text-md items-center w-full text-left p-3 rounded-lg transition ${isActive
                  ? "bg-green-100 text-green-700 font-bold"
                  : "text-gray-600 hover:bg-gray-100"
                  }`}
              >
                {item.icon({ className: 'h-5 w-5 mr-3' })}
                {item.name}
              </button>
            );
          })}
        </nav>

        {/* profile */}
        <div className="mb-15 space-y-2 font-semibold">
          <button
            onClick={handleProfileClick}
            className={`flex text-md items-center w-full text-left p-3 rounded-lg transition ${isProfileActive
              ? "bg-green-100 text-green-700 font-bold"
              : "text-gray-600 hover:bg-gray-100 font-semibold"
              }`}
          >
            <FiSettings className="h-5 w-5 mr-3" />
            Profile Settings
          </button>

          <button
            onClick={() => openLogoutCard?.()}
            className='flex text-md text-gray-600 hover:text-red-500 hover:font-bold items-center w-full text-left p-3 transition'>
            <FiLogOut className="h-5 w-5 mr-3" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
