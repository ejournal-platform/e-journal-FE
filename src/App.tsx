import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LoginPage from "./pages/Auth/LoginPage";
// import DashboardPage from "./pages/dashboard/DashboardPage";
import ProfilePage from "./pages/profile/ProfilePage";
import DashboardLayout from "./layouts/DashboardLayout";

// eJournal pages
import UploadActivityPage from "./pages/eJournal/activity/UploadActivityPage";
import MySubmissionsPage from "./pages/eJournal/submission/MySubmissionsPage";
import AnnouncementsPage from "./pages/eJournal/announcement/AnnouncementsPage";
import CommunityPage from "./pages/eJournal/community/CommunityPage";

import { type UserRole } from "./components/ui/Input";
import "./App.css";

// --- Simple role-based dashboard wrapper (can expand later) ---
// const DashboardWrapper: React.FC<{ role: UserRole }> = ({ role }) => {
//   return <DashboardPage role={role} />;
// };

// --- Profile wrapper to use navigate ---
// const ProfileWrapper = () => {
//   const navigate = useNavigate();
//   return <ProfilePage onBack={() => navigate("/dashboard")} />;
// };

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [userNic, setUserNic] = useState<string>("");

  const handleLogin = (nic: string, role: UserRole) => {
    setUserNic(nic);
    setUserRole(role);
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <Routes>
        {/* --- Public Login Page --- */}
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <LoginPage onLogin={handleLogin} />
            )
          }
        />

        {/* --- Dashboard main cards --- */}
        {/* <Route
          path="/dashboard"
          element={
            isLoggedIn && userRole ? (
              <DashboardWrapper role={userRole} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        /> */}

        {/* --- Sidebar Layout Pages (E-Journal Section) --- */}
        {isLoggedIn && userRole && (
          <Route path="/dashboard" element={<DashboardLayout role={userRole} nic={userNic} />}>
           {/* view community section after login first */}
            <Route index element={<Navigate to="community" replace />} />

            {/* inner pages */}
            <Route path="upload" element={<UploadActivityPage />} />
            <Route path="announcements" element={<AnnouncementsPage />} />
            <Route path="submissions" element={<MySubmissionsPage />} />
            <Route path="community" element={<CommunityPage />} />
            <Route path="profile" element={<ProfilePage />} />
            {/*
            <Route path="announcements" element={<AnnouncementsPage />} />
             */}
          </Route>
        )}

        {/* --- Profile Route --- */}
        {/* <Route
          path="/profile"
          element={
            isLoggedIn ? (
              <ProfileWrapper />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        /> */}

        {/* --- Default Redirect --- */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* --- 404 Fallback --- */}
        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
      </Routes>
    </Router>
  );
};

export default App;
