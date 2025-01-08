import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import api from '../axiosInterseptor';

import styled from 'styled-components';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  // const refreshAccessToken = async () => {
  //   try {
  //     await api.post('/api/token'); // Call refresh endpoint
  //     console.log('Access token refreshed');
  //     return true;
  //   } catch (error) {
  //     console.error('Failed to refresh token:', error);
  //     return false;
  //   }
  // };

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await api.get(`/api/auth/verify`);

        if (response.data.success) {
          setTimeout(() => {
            setIsAuthenticated(true);
          }, 700);
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
