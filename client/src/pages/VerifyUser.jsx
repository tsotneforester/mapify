import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;
import SharedAuth from '../components/SharedAuth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import PuffLoader from 'react-spinners/PuffLoader';

const VerifyUser = () => {
  const { jwt } = useParams(); // Get the JWT from the URL parameters
  const navigate = useNavigate();

  async function verifyToken() {
    try {
      console.log(`${API_URL}/confirm/${jwt}`);
      await axios.post(`${API_URL}/confirm/${jwt}`);

      //navigate('/check-email'); // Redirect to protected route

      toast.success(`user verified`);

      // Redirect to protected route
    } catch (error) {
      toast.error(`${error.response.data.message}`);
    } finally {
      navigate('/login');
    }
  }

  useEffect(() => {
    setTimeout(() => {
      verifyToken();
    }, 2000);
  }, []);

  return (
    <SharedAuth>
      <h1>Token Verification Loading</h1>
      <PuffLoader color="#0d98f1" />
    </SharedAuth>
  );
};

export default VerifyUser;
