import React from 'react';
import { Navigate } from 'react-router-dom';

// const ProtectedRoute = ({ children }) => {
//   // Check if the user is logged in by looking for the token in localStorage
//   const isAuthenticated = localStorage.getItem('token');

//   if (!isAuthenticated) {
//     // Redirect to login if not authenticated
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('access');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;