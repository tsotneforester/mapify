import { useEffect } from 'react';

import SharedAuth from '../components/SharedAuth';
import { toast } from 'react-toastify';
import PuffLoader from 'react-spinners/PuffLoader';

import { useNavigate, useLocation } from 'react-router-dom';
import useVerifyProtectedRoute from '../hooks/useVerifyProtectedRoute';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  async function verifyToken() {
    try {
      navigate('/');

      toast.success(`ბალანსი შეივსო`);
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
      <h1>Processing payment successfully, redirecting....</h1>
      <PuffLoader color="#0d98f1" />
    </SharedAuth>
  );
};

export default PaymentSuccess;
