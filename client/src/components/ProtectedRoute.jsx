import React from 'react';
import { useState, useContext, useEffect, useCallback, useMemo } from 'react';

import { jwtDecode } from 'jwt-decode';
import { BrowserRouter, Routes, Route, NavLink, Link, useNavigate, Navigate, useSearchParams } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = sessionStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || isTokenExpired(token)) {
      // Token is invalid or expired
      sessionStorage.removeItem('token'); // Clear invalid token
      navigate('/login'); // Redirect to login
    }
  }, [navigate, token]);

  if (!token || isTokenExpired(token)) {
    return null; // Prevent rendering children until validation is done
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
