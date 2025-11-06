import React, { useState, type FormEvent } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FaLock, FaWhatsapp } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FiUser, FiMail, FiPhone, FiSave } from "react-icons/fi";

export const ProfilePage = () => {
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
    whatsapp: "",
    districy: "",
    role: "EndUser",
    image: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
    <div className="min-h-screen w-full bg-gray-200 flex flex-col font-sans overflow-x-hidden">
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
                WhatsApp Number
              </label>
              <div className="flex items-center bg-gray-100 rounded-lg px-4 py-3">
                <FaWhatsapp className="text-gray-500 mr-2" />
                <input
                  type="tel"
                  name="whatsapp"
                  placeholder="WhatsApp Number"
                  value={profile.whatsapp}
                  onChange={handleChange}
                  className="w-full bg-transparent outline-none text-gray-800"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                District
              </label>
              <div className="flex items-center bg-gray-100 rounded-lg px-4 py-3">
                <FaLocationDot className="text-gray-500 mr-2" />
                <input
                  type="text"
                  name="district"
                  placeholder="District"
                  value={profile.districy}
                  onChange={handleChange}
                  className="w-full bg-transparent outline-none text-gray-800"
                  required
                />
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Change Password
              </label>
              <div className="flex items-center bg-gray-100 rounded-lg px-4 py-3">
                <FaLock className="text-gray-500 mr-2" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent outline-none text-gray-800"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-9 right-3 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
                </button>
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
              className={`w-full flex justify-center py-3 px-4 rounded-lg text-lg font-bold text-white mt-4 transition duration-200 ${isSaving
                ? 'bg-green-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700'
                }`}
            >
              {isSaving ? 'Saving...' : <div className="flex justify-center items-center text-sm"><FiSave className="mr-2" /> Save Changes</div>}
            </button>
          </form>
        </div>
      </main>

      <footer className="py-4 text-center text-xs text-gray-500 w-full">
        Powered by The Uni Digital
      </footer>
    </div>
  );
};

export default ProfilePage;
