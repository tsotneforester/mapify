import { useEffect } from 'react';

import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;
import SharedAuth from '../components/SharedAuth';
import { toast } from 'react-toastify';
import PuffLoader from 'react-spinners/PuffLoader';

import { useNavigate, useLocation } from 'react-router-dom';

const ProcessPayment = () => {
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const query = useQuery();
  const token = query.get('token');

  const navigate = useNavigate();

  async function verifyToken() {
    try {
      await axios(`${API_URL}/api/markers`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the header
        },
      });

      navigate('/'); // Redirect to protected route

      toast.success(`ბალანსი შეივსო`);

      // Redirect to protected route
    } catch (error) {
      toast.error(`${error.response.data.message}`);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      verifyToken();
    }, 2000);
  }, []);

  return (
    <SharedAuth>
      <h1>Processing payment, redirecting....</h1>
      <PuffLoader color="#0d98f1" />
    </SharedAuth>
  );
};

export default ProcessPayment;
