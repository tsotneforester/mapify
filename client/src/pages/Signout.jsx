import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Signout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear the token from localStorage
    sessionStorage.clear();
    // Redirect to login page
    navigate('/login');
  }, [navigate]);

  return <h1>Signing you out...</h1>;
};

export default Signout;
