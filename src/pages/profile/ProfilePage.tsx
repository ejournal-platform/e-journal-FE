import React, { useState, type FormEvent } from "react";
import { FiUser, FiSave } from "react-icons/fi";
import { useProfile, useUpdateProfile } from "../../api/hooks/user";

export const ProfilePage = () => {
  const { data: profileData, isLoading, error } = useProfile();
  const { mutate: updateProfile, isPending: isSaving } = useUpdateProfile();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  // Update local state when profile data loads
  React.useEffect(() => {
    if (profileData) {
      setFirstName(profileData.firstName || "");
      setLastName(profileData.lastName || "");
    }
  }, [profileData]);



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
    <div className="min-h-screen w-full bg-gray-200 flex flex-col font-sans overflow-x-hidden">
      {/* Header */}
      {/* <header className="py-4 px-4 sm:px-6 bg-white shadow-md border-b border-gray-100 z-10 flex items-center justify-between">
        <div className="flex items-center text-xl font-bold text-gray-800 font-sans">
          <img src={logo} alt="Logo" className="h-8 w-auto mr-2" />
          Food Safety Watch
        </div>
        <button
          className="flex items-center bg-green-50 p-2 hover:bg-green-400 rounded-md text-green-600 hover:text-white transition font-medium"
        >
          <FiArrowLeft className="mr-1" /> Back to Dashboard
        </button>
      </header> */}

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              {/* Profile Image or Default Icon */}
              <div
                className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-4xl font-bold"
              >
                {profileData?.profileMediaId ? (
                  <img
                    src={`${import.meta.env.VITE_API_BASE_URL}/media/${profileData.profileMediaId}`}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <FiUser className="w-10 h-10" />
                )}
              </div>
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
                {isSaving ? 'Saving...' : <div className="flex justify-center items-center"><FiSave className="mr-2" /> Save Changes</div>}
              </button>
            </form>
          )}
        </div>
      </main>

      <footer className="py-4 text-center text-xs text-gray-500 w-full">
        Powered by an NGO Project on Food Safety
      </footer>
    </div>
  );
};

export default ProfilePage;
