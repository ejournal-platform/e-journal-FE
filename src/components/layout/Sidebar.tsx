import { MdDashboard, MdAssignment, MdCampaign, MdLibraryBooks, MdGroups } from "react-icons/md";

interface SidebarProps {
  userRole: string;
  currentPath: string;
  navigate: (path: string) => void;
}

const navItems = [
  { name: "Community", icon: MdGroups, path: "/dashboard/community" },
  { name: "E-Journal", icon: MdLibraryBooks, path: "/dashboard/upload" },
  { name: "My Submissions", icon: MdAssignment, path: "/dashboard/submissions" },
  { name: "Announcements", icon: MdCampaign, path: "/dashboard/announcements" },
];

const Sidebar = ({ currentPath, navigate }: SidebarProps) => {

  const handleProfileClick = () => {
  navigate("/dashboard/profile"); // if using React Router
};

  return (
    <aside className="flex flex-col w-64 bg-white border-r border-gray-200 p-6 min-h-screen sticky top-0">
      {/* Header */}
      <div className=" justify-center ">
        <div className="mb-4 bg-blue-300 p-2 rounded-lg text-center">
          <h1 className="text-lg font-bold text-gray-700">Dashboard</h1>
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
                  ? "bg-green-100 text-green-700 font-semibold"
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
      <div className="mb-10">
        <button 
        className="flex items-center p-3 rounded-lg text-gray-600 hover:bg-gray-100 mt-4 transition"
        onClick={handleProfileClick}>
        ⚙️ Profile
      </button>
      </div>
      
    </aside>
  );
};

export default Sidebar;
