import { useState } from 'react';
import logo from '../../assets/logo.png';
import { type UserRole } from '../../components/ui/Input';
import { useNavigate } from 'react-router-dom';
import { FiUpload, FiClock, FiSpeaker, FiUsers, FiUser } from 'react-icons/fi';
import { DashboardCard } from '../../components/dashboard/DashboardCard';

interface DashboardPageProps {
  nic?: string;
  role: UserRole;
}

const DashboardPage = ({ nic, role }: DashboardPageProps) => {
  const navigate = useNavigate();

  const [user] = useState({
    name: nic || 'User',
    role: role,
  });

  const handleCardClick = (activity: string) => {
    if (activity === 'Upload Activity') {
      navigate('/dashboard/upload');
    } else if (activity === 'View Submissions') {
      navigate('/dashboard/submissions');
    } else if (activity === 'Announcements') {
      navigate('/dashboard/announcements');
    } else if (activity === 'Community Feed') {
      navigate('/dashboard/community');
    }
  };

  const handleProfileClick = () => {
    navigate("/profile"); // if using React Router
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* ✅ Header */}
      <header className="py-4 px-4 sm:px-6 bg-white shadow-md border-b border-gray-100 z-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
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
              Role: <span className="font-semibold text-green-700">{user.role}</span>
            </p>
          </div>

        </div>
      </header>

      {/* ✅ Main Content */}
      <main className="grow p-4 sm:p-6 md:p-8 lg:p-10">
        <div className="mb-8 text-center sm:text-left">
          <h1 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-1">
            Welcome, {user.name}!
          </h1>
          <p className="text-gray-600 text-base sm:text-lg">
            What would you like to do today?
          </p>
        </div>

        {/* ✅ Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <DashboardCard
            title="Upload Activity"
            description="Share your latest project activities and reports."
            icon={<FiUpload />}
            onClick={() => handleCardClick('Upload Activity')}
          />
          <DashboardCard
            title="View My Submissions"
            description="Review your past uploads and their status."
            icon={<FiClock />}
            onClick={() => handleCardClick('View Submissions')}
          />
          <DashboardCard
            title="Announcements"
            description="Stay updated with the latest news and announcements."
            icon={<FiSpeaker />}
            onClick={() => handleCardClick('Announcements')}
          />
          <DashboardCard
            title="Community Feed"
            description="Connect and share with other members of the community."
            icon={<FiUsers />}
            onClick={() => handleCardClick('Community Feed')}
          />
        </div>

        {/* ✅ Project Overview Section */}
        <div className="mt-12">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 text-center sm:text-left">
            Project Overview (BESPA-FOOD)
          </h2>
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-gray-100 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="border-l-4 border-yellow-500 pl-4">
              <p className="text-sm font-semibold text-gray-500 uppercase">Goal</p>
              <p className="text-gray-700 mt-1 text-sm sm:text-base">
                Consumer organizations, trade organizations and communities demand effective
                governance and mechanisms for food safety.
              </p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="text-sm font-semibold text-gray-500 uppercase">Aim</p>
              <p className="text-gray-700 mt-1 text-sm sm:text-base">
                Educating and changing the behavior of consumers to demand safe food.
              </p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <p className="text-sm font-semibold text-gray-500 uppercase">Your Role</p>
              <p className="text-base sm:text-lg font-bold text-green-700 mt-1">{user.role}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
