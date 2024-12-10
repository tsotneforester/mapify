import React from 'react';

import { jwtDecode } from 'jwt-decode';
import { BrowserRouter, Routes, Route, NavLink, Link, useNavigate, Navigate, useSearchParams } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  if (!token || isTokenExpired(token)) {
    // Token is invalid or expired
    localStorage.removeItem('token'); // Clear invalid token
    navigate('/login'); // Redirect to login
  }

  return children;
};

export default ProtectedRoute;

function isTokenExpired(token) {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Current time in seconds
    return decoded.exp < currentTime; // Returns true if the token is expired
  } catch (error) {
    return true; // Invalid token
  }
}
