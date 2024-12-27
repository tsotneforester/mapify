import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import SharedAuth from '../components/SharedAuth';
import { AppContext } from '../Context';
import { useContext, useEffect, useState } from 'react';
import SubmitButton from '../components/SubmitButton';
const API_URL = import.meta.env.VITE_API_URL;

import { toast } from 'react-toastify';

const CheckEmail = () => {
  const navigate = useNavigate();
  const { justSignedUp, setJustSignedUp } = useContext(AppContext);
  let [loadingButton, setLoadingButton] = useState(false);
  const email = sessionStorage.getItem('email');

  async function resendHandler() {
    setLoadingButton(true);
    try {
      let response = await axios.post(`${API_URL}/resend/${email}`);
      toast.success(`${response.data.message}`);
    } catch (error) {
      toast.error(`${error.response.data.message}`);
    } finally {
      setLoadingButton(false);
    }
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
        <SubmitButton
          label="Resend"
          color="info"
          loading={loadingButton}
          style={{ marginTop: '20px', color: 'white' }}
        />
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
