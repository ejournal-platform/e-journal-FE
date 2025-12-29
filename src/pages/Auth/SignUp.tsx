import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/ui/Input";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import logo from "../../assets/logo.jpg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import bgImage from '../../assets/background/bg1.jpeg';
import { useRegister } from "../../api/hooks/auth";

// const validateNicAndRole = (nic: string, role: UserRole) => {
//   if (!nic || !role) return false;
//   if (nic.startsWith("1") && role === "MasterTrainer") return true;
//   if (nic.startsWith("2") && role === "TOT") return true;
//   if (nic.startsWith("3") && role === "EndUser") return true;
//   if (nic.startsWith("798164171V") && role === "Admin") return true;
//   if (nic.startsWith("199573801049") && role === "Admin") return true;
//   if (nic.startsWith("199251103506") && role === "Admin") return true;
//   if (nic.startsWith("976392779V") && role === "Admin") return true;
//   return false;
// };

const Signup = () => {
  const navigate = useNavigate();

  const [nic, setNic] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);
  const { mutate: register, isPending: isLoading } = useRegister();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!nic.trim() || !password.trim() || !confirmPassword.trim()) {
      setMessage({ type: "error", text: "Please fill in all fields." });
      return;
    }

    if (password !== confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match. Please re-enter." });
      return;
    }

    register(
      { nic, password, firstName: "", lastName: "" }, // Assuming first/last name are optional or not in form yet
      {
        onSuccess: () => {
          setMessage({ type: "success", text: "Signup successful! Please login." });
          setNic("");
          setPassword("");
          setConfirmPassword("");

          // Redirect to login after short delay
          setTimeout(() => navigate("/signIn"), 1000);
        },
        onError: (error: any) => {
          const errorMessage = error?.response?.data?.error || "Signup failed. NIC might be already registered.";
          setMessage({ type: "error", text: errorMessage });
        }
      }
    );
  };

  return (
    <div className=" min-h-screen w-full bg-gray-50 flex flex-col font-sans items-center justify-center">

      <div
        className="fixed z-10 opacity-30 pointer-events-none" >
        <img src={bgImage} alt="App Logo" className="w-full" />
      </div>

      <div className="relative z-20 flex flex-col min-h-screen w-full items-center">

        <header className="py-2 px-6 w-full mb-9">
          <div className="flex items-center text-xl font-bold text-gray-800 font-sans">
            <img src={logo} alt="App Logo" className="h-12 w-12 object-contain mr-2" />
            Food Safety Watch
          </div>
        </header>

        {/* Signup Form Section */}
        <form
          onSubmit={handleSignup}
          className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl space-y-4"
        >
          {/* Form Heading & Message Area */}
          <h1 className="text-2xl font-extrabold text-gray-900 mb-1 text-center">
            Create an Account
          </h1>
          <p className="text-sm text-gray-600 font-semibold text-center mb-4">
            Sign up with your NIC and password.
          </p>

          {message && (
            <div
              className={`p-3 mb-6 rounded-lg text-sm font-medium ${message.type === "error"
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"}`}
            >
              {message.text}
            </div>
          )}

          {/* NIC Input */}
          <Input
            id="nic"
            label="NIC Number"
            type="text"
            placeholder="Enter your NIC number"
            value={nic}
            onChange={(e) => setNic(e.target.value)}
            required
          />
          {/* Role Selector */}
          {/* <RoleSelector value={role} onChange={setRole} /> */}

          {/* Password Input */}
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
              className="w-full border border-gray-300 rounded-lg py-2 px-3 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-8 right-3 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>

          {/* Confirm Password Input */}
          <div className="relative">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg py-2 px-3 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute top-8 right-3 text-gray-500 hover:text-gray-700"
            >
              {showConfirmPassword ? (
                <AiFillEyeInvisible size={20} />
              ) : (
                <AiFillEye size={20} />
              )}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full flex justify-center py-3 px-4 rounded-lg shadow-sm text-md font-bold text-white mt-6 ${isLoading
              ? "bg-green-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700 transition duration-200"}`}
          >
            Sign Up
          </button>

          {/* Login Link (Final bit of form content) */}
          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?
            <button
              type="button"
              onClick={() => navigate("/signIn")}
              className="font-medium text-green-600 hover:text-green-500 ml-1"
            >
              Login
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
