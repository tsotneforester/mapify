import { useEffect } from 'react';

import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

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
  if (!token) {
    return true; // Return true if the token is not provided
  }

  try {
    const { exp } = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

    return exp < currentTime; // Returns true if the token is expired
  } catch (error) {
    console.error('Token decoding failed:', error);
    return true; // Return true for invalid tokens
  }
}
