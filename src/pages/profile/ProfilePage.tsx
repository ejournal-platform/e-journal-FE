import React, { useState, type FC, type FormEvent } from "react";
import { FiUser, FiMail, FiPhone, FiArrowLeft, FiSave } from "react-icons/fi";
import logo from "../../assets/logo.png";

interface ProfilePageProps {
  onBack: () => void; // to navigate back to Dashboard
}

export const ProfilePage = ({ onBack } : ProfilePageProps) => {
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "EndUser",
    image: "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    setTimeout(() => {
      setIsSaving(false);
      setMessage("✅ Profile updated successfully!");
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col font-sans overflow-x-hidden">
      {/* Header */}
      <header className="py-4 px-4 sm:px-6 bg-white shadow-md border-b border-gray-100 z-10 flex items-center justify-between">
        <div className="flex items-center text-xl font-bold text-gray-800 font-sans">
          <img src={logo} alt="Logo" className="h-8 w-auto mr-2" />
          Food Safety Watch
        </div>
        <button
          onClick={onBack}
          className="flex items-center bg-green-50 p-2 hover:bg-green-400 rounded-md text-green-600 hover:text-white transition font-medium"
        >
          <FiArrowLeft className="mr-1" /> Back to Dashboard
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
  {/* Profile Image or Default Icon */}
  <div
    onClick={() => document.getElementById("fileInput")?.click()}
    className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-4xl font-bold cursor-pointer hover:bg-green-200 transition"
  >
    {profile.image ? (
      <img
        src={profile.image}
        alt="Profile"
        className="w-full h-full rounded-full object-cover"
      />
    ) : (
      <FiUser className="w-10 h-10" />
    )}
  </div>

  {/* Hidden file input */}
  <input
    id="fileInput"
    type="file"
    accept="image/*"
    className="hidden"
    onChange={(e) => {
      const file = e.target.files?.[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setProfile((prev) => ({ ...prev, image: imageUrl }));
      }
    }}
  />
</div>

            <h2 className="text-2xl font-extrabold text-gray-800 mt-3">
              Edit Profile
            </h2>
            <p className="text-gray-500 text-sm">Manage your account details</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Full Name
              </label>
              <div className="flex items-center bg-gray-100 rounded-lg px-4 py-3">
                <FiUser className="text-gray-500 mr-2" />
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={profile.fullName}
                  onChange={handleChange}
                  className="w-full bg-transparent outline-none text-gray-800"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email Address
              </label>
              <div className="flex items-center bg-gray-100 rounded-lg px-4 py-3">
                <FiMail className="text-gray-500 mr-2" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={profile.email}
                  onChange={handleChange}
                  className="w-full bg-transparent outline-none text-gray-800"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Phone Number
              </label>
              <div className="flex items-center bg-gray-100 rounded-lg px-4 py-3">
                <FiPhone className="text-gray-500 mr-2" />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={profile.phone}
                  onChange={handleChange}
                  className="w-full bg-transparent outline-none text-gray-800"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Role
              </label>
              <input
                type="text"
                value={profile.role}
                readOnly
                className="w-full px-4 py-3 bg-gray-100 rounded-lg text-gray-600 cursor-not-allowed"
              />
            </div>

            {message && (
              <p className="text-green-600 text-center text-sm">{message}</p>
            )}

            <button
              type="submit"
              disabled={isSaving}
              className={`w-full flex justify-center py-3 px-4 rounded-lg text-lg font-bold text-white mt-4 transition duration-200 ${
                isSaving
                  ? 'bg-green-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {isSaving ? 'Saving...' : <div className="flex justify-center items-center"><FiSave className="mr-2" /> Save Changes</div>}
            </button>
          </form>
        </div>
      </main>

      <footer className="py-4 text-center text-xs text-gray-500 w-full">
        Powered by an NGO Project on Food Safety
      </footer>
    </div>
  );
};

export default ProfilePage;
