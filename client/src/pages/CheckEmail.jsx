import axios from 'axios';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import SharedAuth from '../components/SharedAuth';
import { AppContext } from '../Context';
import { useState, useContext, useEffect, useCallback, useMemo } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

const CheckEmail = () => {
  const navigate = useNavigate();
  const { justSignedUp, setJustSignedUp } = useContext(AppContext);
  const email = sessionStorage.getItem('email');

  async function resendHandler() {
    try {
      const response = await axios.post(`${API_URL}/resend/${email}`);
    } catch (error) {}
  }

  useEffect(() => {
    if (!justSignedUp) {
      // Redirect or display an error message
      navigate('/');
    } else {
      setJustSignedUp(false);
    }
  }, []);

  return (
    <SharedAuth>
      <h1>Check Your Email</h1>
      <p>
        We've sent you a confirmation email. Please check your inbox to verify
        your account.
      </p>
      <code>
        <p onClick={resendHandler}>resend</p> on {email}
      </code>
    </SharedAuth>
  );
};

export default CheckEmail;

const S = {};

S.Form = styled(Form)`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  max-width: 300px;
`;
