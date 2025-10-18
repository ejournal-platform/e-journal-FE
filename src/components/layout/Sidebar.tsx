import { MdDashboard, MdAssignment, MdCampaign, MdLibraryBooks, MdGroups } from "react-icons/md";

interface SidebarProps {
  userRole: string;
  currentPath: string;
  navigate: (path: string) => void;
}

const navItems = [
  { name: "Dashboard",icon: MdDashboard,  path: "/dashboard" },
  { name: "E-Journal", icon: MdLibraryBooks, path: "/dashboard/upload" },
  { name: "My Submissions", icon: MdAssignment, path: "/dashboard/submissions" },
  { name: "Announcements", icon: MdCampaign, path: "/dashboard/announcements" },
  { name: "Community", icon: MdGroups, path: "/dashboard/community" },
];

const Sidebar = ({ userRole, currentPath, navigate } : SidebarProps) => {
  return (
    <aside className="flex flex-col w-64 bg-white border-r border-gray-200 p-6 min-h-screen sticky top-0">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-xl font-bold text-gray-800">Food Safety Initiative</h1>
        <p className="text-sm text-green-600">{userRole}</p>
      </div>

      {/* Navigation */}
      <nav className="flex-grow space-y-2 font-semibold">
        {navItems.map((item) => {
          const isActive = currentPath === item.path;
          return (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`flex items-center w-full text-left p-3 rounded-lg transition ${
                isActive
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

      {/* Settings */}
      {/* <button className="flex items-center p-3 rounded-lg text-gray-600 hover:bg-gray-100 mt-4 transition">
        ⚙️ Settings
      </button> */}
    </aside>
  );
};

export default Sidebar;
