import { type InputHTMLAttributes, type FC, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

export type UserRole = 'MasterTrainer' | 'TOT' | 'EndUser' | 'Staff' | null;

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

export const Input = ({ label, id, type = 'text', placeholder, ...props }: InputProps) => {
  return (
    <div className="mb-6">
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-gray-700 mb-2"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className="block w-full px-4 py-3 bg-gray-100 border-none rounded-lg 
                   focus:outline-none focus:ring-1 focus:ring-green-500 text-gray-800 
                   transition duration-150"
        {...props}
      />
    </div>
  );
};

// ✅ Custom Div-Based Dropdown for Role Selection
export const RoleSelector: FC<{ value: UserRole; onChange: (role: UserRole) => void }> = ({
  value,
  onChange,
}) => {
  const roles: Exclude<UserRole, null>[] = ['MasterTrainer', 'TOT', 'EndUser', 'Staff'];
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (role: Exclude<UserRole, null>) => {
    onChange(role);
    setIsOpen(false);
  };

  return (
    <div className="mb-6 relative">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Select Your Role
      </label>

      {/* Selected Box */}
      <div
        className="w-full px-4 py-3 bg-gray-100 rounded-lg border border-transparent 
                   flex justify-between items-center text-gray-800 cursor-pointer 
                   focus:outline-none focus:ring-1 focus:ring-green-500 
                   transition duration-150 hover:border-green-400"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{value || '-- Select Role --'}</span>
        <FiChevronDown
          className={`text-gray-600 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </div>

      {/* Dropdown List */}
      {isOpen && (
        <div
          className="absolute z-10 mt-1 w-full bg-gray-100 border border-gray-200 
                     rounded-lg shadow-lg max-h-30 overflow-y-auto"
        >
          {roles.map((role) => (
            <div
              key={role}
              onClick={() => handleSelect(role)}
              className={`px-4 py-2 text-sm sm:text-base cursor-pointer 
                          hover:bg-green-200 ${
                            value === role ? 'bg-green-50 text-green-700 font-semibold' : ''
                          }`}
            >
              {role}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
