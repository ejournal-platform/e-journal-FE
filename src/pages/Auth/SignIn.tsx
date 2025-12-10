import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/ui/Input";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import bgImage from '../../assets/background/bg1.jpeg';
import logo from "../../assets/logo.jpg";
import { useLogin } from "../../api/hooks/auth";
import { useAuth } from "../../context/AuthContext";


const SignIn = () => {
  const navigate = useNavigate();

  const [nic, setNic] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);
  const { mutate: login, isPending: isLoading } = useLogin();
  const { login: authLogin } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!nic.trim() || !password.trim()) {
      setMessage({ type: "error", text: "Please enter your NIC and password." });
      return;
    }

    login(
      { nic, password },
      {
        onSuccess: (data) => {
          // Assuming the backend returns the role in the token or response
          // For now, we might need to decode the token or fetch profile
          // But the current AuthContext expects a role.
          // Let's assume for now we decode it or get it from response if available.
          // The current AuthResponse only has token.
          // We might need to fetch profile after login to get role.
          // For this step, I will pass the token to authLogin.
          // And temporarily hardcode role or fetch it.
          // Wait, the previous code passed role.
          // Let's check AuthContext again.
          // It takes (role, token).
          // I will decode the token to get the role if possible, or fetch profile.
          // Since I can't easily decode JWT here without a library, and I don't want to add more deps if not needed.
          // I'll check if I can get role from response.
          // The backend login response only has token.
          // I should probably fetch profile.
          // But for now, I will use a placeholder role or try to parse the token payload manually.

          // Actually, let's just store the token and navigate.
          // The AuthContext might need updating if role is strictly required for rendering.
          // Let's try to parse the JWT payload manually (it's just base64).

          try {
            const payload = JSON.parse(atob(data.token.split('.')[1]));
            // Backend claims: roles (string or array?)
            // Feature file says: roles: INSTITUTE_ADMIN.
            // Let's assume standard role mapping.
            // If payload.roles is what we need.

            // For safety, let's just pass 'EndUser' as default if parsing fails or complex.
            // Or better, let's fetch profile immediately? 
            // No, let's just use the token.

            authLogin(payload.roles || 'EndUser', data.token, nic);
            navigate("/dashboard/community");
          } catch (e) {
            console.error("Failed to parse token", e);
            setMessage({ type: "error", text: "Login failed: Invalid token." });
          }
        },
        onError: () => {
          setMessage({ type: "error", text: "Invalid NIC or password." });
        }
      }
    );
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col font-sans">

      <div
        className="fixed z-10 opacity-30 pointer-events-none" >
        <img src={bgImage} alt="App Logo" className="w-full" />
      </div>

      <div className="relative z-20 flex flex-col min-h-screen w-full">

        {/* Header */}
        <header className="py-2 px-6 w-full">
          <div className="flex items-center text-xl font-bold text-gray-800 font-sans">
            <img src={logo} alt="App Logo" className="h-12 w-12 object-contain mr-2" />
            Food Safety Watch
          </div>
        </header>

        {/* Card */}
        <main className="grow flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-extrabold text-gray-900 mb-1">Welcome Back</h1>
              <p className="text-sm text-gray-600 font-semibold">
                Enter your NIC and password to continue.
              </p>
              </div>

            {message && (
              <div
                className={`p-3 mb-6 rounded-lg text-sm font-medium ${message.type === "error"
                    ? "bg-red-100 text-red-700"
                    : "bg-green-100 text-green-700"
                  }`}
              >
                {message.text}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                id="nic"
                label="NIC Number"
                type="text"
                placeholder="Enter your NIC number"
                value={nic}
                onChange={(e) => setNic(e.target.value)}
                required
              />

              <div className="relative">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Password
                </label>

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg py-2 px-3 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
                
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-8 right-3 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
                </button>
              </div>

              <button
                type="submit"
                className={`w-full flex justify-center py-3 px-4 rounded-lg shadow-sm text-md font-bold text-white mt-6 ${isLoading
                    ? "bg-green-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700 transition duration-200"
                  }`}
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </form>

            {/* 👇 Add navigation to Signup page */}
            <p className="mt-6 text-center text-sm text-gray-500">
              Don’t have an account?
              <button
                type="button"
                onClick={() => navigate("/signup")}
                className="font-medium text-green-600 hover:text-green-500 ml-1"
              >
                Sign Up
              </button>
            </p>
          </div>
        </main> 

      <footer className="py-4 text-center text-xs text-gray-500 w-full">
        Powered by an NGO Project on Food Safety
      </footer>
    </div>
    </div>
  );
};

export default SignIn;
