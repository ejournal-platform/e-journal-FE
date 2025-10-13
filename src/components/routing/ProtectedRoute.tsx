// src/components/routing/ProtectedRoute.tsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth, type UserRole } from '../../context/AuthContext';

interface ProtectedRouteProps {
  // Optional: Array of roles allowed to access this route
  allowedRoles?: UserRole[]; 
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { userRole } = useAuth();
  const isAuthenticated = userRole !== null;
  
  // 1. Check if user is logged in
  if (!isAuthenticated) {
    // If not logged in, redirect to the login page
    return <Navigate to="/login" replace />;
  }
  
  // 2. Check if user has the allowed role(s)
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // If logged in but role is not allowed (e.g., TOT accessing Admin page), 
    // redirect them to their own dashboard or an unauthorized page.
    // For simplicity, we'll send them to a generic home/unauthorized page.
    return <Navigate to="/unauthorized" replace />;
  }

  // If authenticated and authorized, render the child routes/components
  return <Outlet />;
};

export default ProtectedRoute;