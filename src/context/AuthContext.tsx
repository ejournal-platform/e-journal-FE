import React, { createContext, useContext, useState, type ReactNode } from 'react';

// 1. Define the User Roles based on project requirements
export type UserRole = 'MasterTrainer' | 'TOT' | 'EndUser' | 'Staff' | null;

// 2. Define the shape of the Context's value
interface AuthContextType {
  userRole: UserRole;
  token: string | null;
  nic: string | null;
  login: (role: UserRole, token: string, nic: string) => void;
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

  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token') || null
  );

  const [nic, setNic] = useState<string | null>(
    localStorage.getItem('nic') || null
  );

  const login = (role: UserRole, token: string, nic: string) => {
    setUserRole(role);
    setToken(token);
    setNic(nic);
    if (role) {
      localStorage.setItem('userRole', role);
    }
    if (token) {
      localStorage.setItem('token', token);
    }
    if (nic) {
      localStorage.setItem('nic', nic);
    }
  };

  const logout = () => {
    setUserRole(null);
    setToken(null);
    setNic(null);
    localStorage.removeItem('userRole');
    localStorage.removeItem('token');
    localStorage.removeItem('nic');
  };

  const value = { userRole, token, nic, login, logout };

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