import React, { useState, type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, RoleSelector, type UserRole } from '../../components/ui/Input';
import logo from '../../assets/logo.png'

interface LoginPageProps {
  onLogin: (nic: string, role: UserRole) => void;
}

const LoginPage = ({ onLogin }: LoginPageProps) => {
  const navigate = useNavigate();

  const [nic, setNic] = useState<string>('');
  const [mockRole, setMockRole] = useState<UserRole>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<{ type: 'error' | 'success', text: string } | null>(null);

  // Example role-to-NIC validation (mock rule)
  const validateRoleWithNic = (nic: string, role: UserRole) => {
    if (!role) return false;

    // Simple mock: NIC starting with "1" → MasterTrainer, "2" → TOT, etc.
    if (nic.startsWith('1') && role === 'MasterTrainer') return true;
    if (nic.startsWith('2') && role === 'TOT') return true;
    if (nic.startsWith('3') && role === 'EndUser') return true;
    if (nic.startsWith('4') && role === 'Staff') return true;

    return false; // Wrong role for this NIC
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!nic.trim()) {
      setMessage({ type: 'error', text: 'Please enter your NIC number.' });
      return;
    }
    if (!mockRole) {
      setMessage({ type: 'error', text: 'Please select your role.' });
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      if (!validateRoleWithNic(nic, mockRole)) {
        setMessage({ type: 'error', text: 'NIC and Role do not match. Please check again.' });
        return;
      }

      // Call the parent onLogin function
      onLogin(nic, mockRole);

      // Navigate to dashboard
      navigate('/dashboard');

      setMessage({ type: 'success', text: 'Login successful! Redirecting to dashboard...' });
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col font-sans">
      {/* Header */}
      <header className="py-4 px-6 w-full">
        <div className="flex items-center text-xl font-bold text-gray-800 font-sans">
          <span className="mr-2">
            <img src={logo} alt="App Logo" className="h-6 w-6 object-contain" />
          </span>
          Food Safety Watch
        </div>
      </header>

      {/* Login Card */}
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white p-6 sm:p-8 md:p-10 rounded-xl shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-sm text-gray-600 font-semibold">Enter your NIC and select your registered role.</p>
          </div>

          {message && (
            <div className={`p-3 mb-6 rounded-lg text-sm font-medium ${message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
              }`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              id="nic"
              label="NIC Number"
              type="text"
              placeholder="Enter your NIC number"
              value={nic}
              onChange={(e) => setNic(e.target.value)}
              required
              disabled={isLoading}
            />

            <RoleSelector value={mockRole} onChange={setMockRole} />

            <button
              type="submit"
              className={`w-full flex justify-center py-3 px-4 rounded-lg shadow-sm text-lg font-bold text-white mt-8
                ${isLoading ? '!bg-green-400 cursor-not-allowed' : '!bg-green-600 hover:!bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:!ring-green-500 transition duration-150'}`}
              disabled={isLoading || !mockRole || nic.trim().length === 0}
            >
              {isLoading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Having trouble logging in?
            <a href="#" className="font-medium text-green-600 hover:text-green-500 ml-1">Contact Support</a>
          </p>
        </div>
      </main>

      <footer className="py-4 text-center text-xs text-gray-500 w-full">
        Powered by an NGO Project on Food Safety
      </footer>
    </div>
  );
};

export default LoginPage;
