import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import SharedAuth from '../components/SharedAuth';
import { AppContext } from '../Context';
import { useContext, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
const API_URL = import.meta.env.VITE_API_URL;
//import { toast } from 'react-toastify';

const CheckEmail = () => {
  const navigate = useNavigate();
  const { justSignedUp, setJustSignedUp } = useContext(AppContext);
  const email = sessionStorage.getItem('email');

  async function resendHandler() {
    try {
      await axios.post(`${API_URL}/resend/${email}`);
    } catch (error) {}
  }

  useEffect(() => {
    if (!justSignedUp) {
      navigate('/');
    } else {
      setJustSignedUp(false);
    }
  }, []);

  return (
    <SharedAuth>
      <S.Container>
        <h1>Check Your Email 💌</h1>
        <p>
          We&apos;ve sent you a confirmation email <span>({email})</span>.
          Please check your inbox to verify your account.
        </p>
        <Button
          style={{ marginTop: '20px' }}
          onClick={resendHandler}
          variant="primary"
        >
          RESEND
        </Button>
      </S.Container>
    </SharedAuth>
  );
};

export default CheckEmail;

const S = {};

S.Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;

  h1 {
    font-size: 22px;
    color: black;
    font-weight: 400;
    text-align: center;
  }

  p {
    font-size: 16px;
    color: #3d3d3d;
    font-weight: 400;
    text-align: center;
    font-style: italic;
  }

  span {
    font-family: 'Courier New', Courier, monospace;
    color: #ff2462;
    font-weight: 700;
    text-align: center;
    font-style: italic;
  }
`;
