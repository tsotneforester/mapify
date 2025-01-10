// 🔰 used for redirecting to dashboard for logged usert trung to enter login/signup/forgot-password
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../axiosInterseptor';

const useVerifyProtectedRoute = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await api.get(`/api/auth/verify-protected-route`);

        if (response.data.status == 'success') {
          navigate('/');

          sessionStorage.setItem('user', response.data.data.name);
          sessionStorage.setItem('avatar', response.data.data.avatar);
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
    };

    verifyToken();
  }, [navigate]);
};

export default useVerifyProtectedRoute;
