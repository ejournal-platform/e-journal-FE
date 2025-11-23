import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, type UserRole } from "../../components/ui/Input";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import logo from "../../assets/logo.jpg";

interface User {
  nic: string;
  password: string;
  role: UserRole;
}

interface SignInProps {
  onLogin: (nic: string, role: UserRole) => void;
  users: User[];
}

const SignIn = ({ onLogin, users }: SignInProps) => {
  const navigate = useNavigate();

  const [nic, setNic] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!nic.trim() || !password.trim()) {
      setMessage({ type: "error", text: "Please enter your NIC and password." });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const existingUser = users.find((u) => u.nic === nic && u.password === password);
      setIsLoading(false);

      if (!existingUser) {
        setMessage({ type: "error", text: "NIC and password do not match our records." });
        return;
      }

      onLogin(existingUser.nic, existingUser.role);
      navigate("/dashboard/community");
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col font-sans">
      {/* Header */}
      <header className="py-2 px-6 w-full">
        <div className="flex items-center text-xl font-bold text-gray-800 font-sans">
          <img src={logo} alt="App Logo" className="h-12 w-12 object-contain mr-2" />
          Food Safety Watch
        </div>
      </header>

      {/* Card */}
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-extrabold text-gray-900 mb-1">Welcome Back</h1>
            <p className="text-sm text-gray-600 font-semibold">
              Enter your NIC and password to continue.
            </p>
          </div>

          {message && (
            <div
              className={`p-3 mb-6 rounded-lg text-sm font-medium ${
                message.type === "error"
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
              className={`w-full flex justify-center py-3 px-4 rounded-lg shadow-sm text-lg font-bold text-white mt-6 ${
                isLoading
                  ? "!bg-green-400 cursor-not-allowed"
                  : "!bg-green-600 hover:!bg-green-700 transition duration-150"
              }`}
            >
              Login
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
        Powered by The Uni Digital
      </footer>
    </div>
  );
};

export default SignIn;
