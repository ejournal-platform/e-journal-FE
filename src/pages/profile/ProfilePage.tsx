import React, { useState, type FormEvent } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FaLock, FaWhatsapp } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FiUser, FiSave } from "react-icons/fi";

import { useProfile, useUpdateProfile } from "../../api/hooks/user";

export const ProfilePage = () => {
  const { data: profileData, isLoading, error } = useProfile();
  const { mutate: updateProfile, isPending: isSaving } = useUpdateProfile();

  // State for fields that are updatable (First Name, Last Name)
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // State for additional fields from HEAD (currently not linked to updateProfile mutation)
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [district, setDistrict] = useState("");
  const [profileImage, setProfileImage] = useState<string | undefined>(undefined);

  const [message, setMessage] = useState<string | null>(null);
  const [password, setPassword] = useState(""); // For password change
  const [showPassword, setShowPassword] = useState(false);

  // Update local state when profile data loads
  React.useEffect(() => {
    if (profileData) {
      setFirstName(profileData.firstName || "");
      setLastName(profileData.lastName || "");

      if (profileData.profileMediaId) {
        setProfileImage(`${import.meta.env.VITE_API_BASE_URL}/media/${profileData.profileMediaId}`);
      }
    }
  }, [profileData]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      // Future: Here you would call an API hook to upload the image and get the profileMediaId
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setMessage(null);

    updateProfile({
      firstName,
      lastName,
      // profileMediaId can be added later when image upload is implemented
    }, {
      onSuccess: () => {
        setMessage("✅ Profile updated successfully!");
      },
      onError: () => {
        setMessage("❌ Failed to update profile.");
      }
    });
  };

  return (
    <div className="min-h-screen w-full flex flex-col font-sans overflow-x-hidden">
      {/* Main Content */}
      <main className="grow flex items-center justify-center p-6">
        <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8 border border-gray-300">
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              {/* Profile Image or Default Icon */}
              <div
                onClick={() => document.getElementById("fileInput")?.click()}
                className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-4xl font-bold cursor-pointer hover:bg-green-200 transition"
              >
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <FiUser className="w-10 h-10" />
                )}
              </div>

              {/* Hidden file input for image upload (from HEAD) */}
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>

            <h2 className="text-2xl font-extrabold text-gray-800 mt-3">
              {profileData ? `${profileData.firstName} ${profileData.lastName}` : "Edit Profile"}
            </h2>
            <p className="text-gray-500 text-sm">Manage your account details</p>
          </div>

          {isLoading && <p className="text-center text-gray-500">Loading profile...</p>}
          {error && <p className="text-center text-red-500">Failed to load profile.</p>}


          {!isLoading && !error && (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  First Name
                </label>
                <div className="flex items-center bg-gray-100 rounded-lg px-4 py-3">
                  <FiUser className="text-gray-500 mr-2" />
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full bg-transparent outline-none text-gray-800"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Last Name
                </label>
                <div className="flex items-center bg-gray-100 rounded-lg px-4 py-3">
                  <FiUser className="text-gray-500 mr-2" />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full bg-transparent outline-none text-gray-800"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  NIC
                </label>
                <input
                  type="text"
                  value={profileData?.nic || ""}
                  readOnly
                  className="w-full px-4 py-3 bg-gray-100 rounded-lg text-gray-600 cursor-not-allowed"
                />
              </div>

              {/* Phone Number (Added from HEAD logic, using local state) */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Phone Number
                </label>
                <div className="flex items-center bg-gray-100 rounded-lg px-4 py-3">
                  <FaWhatsapp className="text-gray-500 mr-2" />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-transparent outline-none text-gray-800"
                    required
                  />
                </div>
              </div>

              {/* WhatsApp Number (Added from HEAD logic, using local state) */}
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
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className="w-full bg-transparent outline-none text-gray-800"
                    required
                  />
                </div>
              </div>


              {/* District (Added from HEAD logic, using local state) */}
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
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full bg-transparent outline-none text-gray-800"
                    required
                  />
                </div>
              </div>


              {/* Role (Read Only) */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Role
                </label>
                <input
                  type="text"
                  value={profileData?.role || ""}
                  readOnly
                  className="w-full px-4 py-3 bg-gray-100 rounded-lg text-gray-600 cursor-not-allowed"
                />
              </div>

              {/* Change Password (Added from HEAD logic, using local state) */}
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Change Password
                </label>
                <div className="flex items-center bg-gray-100 rounded-lg px-4 py-3">
                  <FaLock className="text-gray-500 mr-2" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent outline-none text-gray-800"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
                  </button>
                </div>
              </div>

              {message && (
                <p className="text-center text-sm text-green-600 bg-green-50 p-2 rounded-lg">{message}</p>
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
          )}
        </div>
      </main>

      <footer className="py-4 text-center text-xs text-gray-500 w-full">
        Powered by The Uni Digital
      </footer>
    </div>
  );
};

export default ProfilePage;
