import React, { createContext, useContext, useState, type ReactNode } from 'react';

// 1. Define the User Roles based on project requirements
export type UserRole = 'MasterTrainer' | 'TOT' | 'EndUser' | 'Staff' | null;

// 2. Define the shape of the Context's value
interface AuthContextType {
  userRole: UserRole;
  login: (role: UserRole) => void;
  logout: () => void;
}

// 3. Create the Context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 4. Create the Provider Component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Use localStorage to persist login state across refreshes (simple approach)
  const [userRole, setUserRole] = useState<UserRole>(
    (localStorage.getItem('userRole') as UserRole) || null
  );

  const login = (role: UserRole) => {
    setUserRole(role);
    if (role) {
      localStorage.setItem('userRole', role);
    }
  };

  const logout = () => {
    setUserRole(null);
    localStorage.removeItem('userRole');
  };

  const value = { userRole, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 5. Create a custom hook to consume the context easily
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};