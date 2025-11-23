
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


import "./App.css";
import { useAuth } from "./context/AuthContext";

const App = () => {
  const { userRole, token, nic, logout } = useAuth();
  const isLoggedIn = !!token;




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
              <SignIn />
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
              <SignUp />
            )
          }
        />

        {/* --- Sidebar Layout Pages (E-Journal Section) --- */}
        {isLoggedIn && userRole && (
          <Route
            path="/dashboard"
            element={<DashboardLayout role={userRole} nic={nic || ""} onLogout={logout} />}
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
