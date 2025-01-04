import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;
import styled from 'styled-components';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/auth/verify`, {
          withCredentials: true,
        });

        if (response.data.success) {
          setTimeout(() => {
            setIsAuthenticated(true);
          }, 1000);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Authentication failed:', error);
        setIsAuthenticated(false);
      }
    };

    verifyToken();
  }, []);

  if (isAuthenticated === null) {
    // Show a loading state while checking authentication
    return <S.Loader>Loading...</S.Loader>;
  }

  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" />;
  }

  // Render children if authenticated
  return <>{children}</>;
};

export default ProtectedRoute;

const S = {};
S.Loader = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  min-height: 100svh;
  border-radius: 0;
  background-color: #183da3a6;
  color: white;
  font-size: 38px;
  font-weight: 900;
  text-align: center;
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 9999;
`;
