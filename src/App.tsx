import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import ProfilePage from "./pages/profile/ProfilePage";
import DashboardLayout from "./layouts/DashboardLayout";

import UploadActivityPage from "./pages/eJournal/activity/UploadActivityPage";
import MySubmissionsPage from "./pages/eJournal/submission/MySubmissionsPage";
import AnnouncementsPage from "./pages/eJournal/announcement/AnnouncementsPage";
import CommunityPage from "./pages/eJournal/community/CommunityPage";

import { type UserRole } from "./components/ui/Input";
import "./App.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [userNic, setUserNic] = useState<string>("");

 const [users, setUsers] = useState<
    { nic: string; password: string; role: UserRole }[]
  >([]);

  const handleLogin = (nic: string, role: UserRole) => {
    setUserNic(nic);
    setUserRole(role);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setUserNic("");
  };

  return (
    <Router>
      <Routes>
        {/* --- Public signIn Page --- */}
        <Route
          path="/signIn"
          element={
            isLoggedIn ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <SignIn onLogin={handleLogin} users={users} />
            )
          }
        />

        {/* --- Public signUp Page --- */}
         <Route
          path="/signup"
          element={
            isLoggedIn ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <SignUp users={users} setUsers={setUsers}/>
            )
          }
        />

        {/* --- Sidebar Layout Pages (E-Journal Section) --- */}
       {isLoggedIn && userRole && (
          <Route
            path="/dashboard"
            element={<DashboardLayout role={userRole} nic={userNic} onLogout={handleLogout} />}
          >
            <Route index element={<Navigate to="community" replace />} />
            <Route path="upload" element={<UploadActivityPage />} />
            <Route path="announcements" element={<AnnouncementsPage />} />
            <Route path="submissions" element={<MySubmissionsPage />} />
            <Route path="community" element={<CommunityPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
        )}

        {/* --- Default Redirect --- */}
        <Route path="/" element={<Navigate to="/signIn" replace />} />

        {/* --- 404 Fallback --- */}
        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
      </Routes>
    </Router>
  );
};

export default App;
