import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  requiredRole: string;
  children: React.ReactNode;
}

// Example: role is stored in localStorage as 'role', and token as 'token'
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requiredRole, children }) => {
  const location = useLocation();
  const userRole = localStorage.getItem('role');
  const token = localStorage.getItem('token');

  // You can adjust this logic to match your actual authentication system
  if (!token || userRole !== requiredRole) {
    // Redirect to superadmin login if not authenticated or role mismatch
    return <Navigate to="/NS-MS-1127/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export { ProtectedRoute }; 