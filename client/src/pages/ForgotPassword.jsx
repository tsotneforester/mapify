import axios from 'axios';
import styled from 'styled-components';

import { Link, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import SharedAuth from '../components/SharedAuth';
import { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL;
import SubmitButton from '../components/SubmitButton';
const ForgotPassword = () => {
  const navigate = useNavigate();
  let [loadingButton, setLoadingButton] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function handleLogin(data) {
    let { login_email } = data;
    setLoadingButton(true);
    try {
      const response = await axios.post(`${API_URL}/forgot-password`, {
        email: login_email,
      });

      navigate('/login'); // Redirect to protected route
      toast.success(`${response.data.message}`);
    } catch (error) {
      toast.error(`${error.response.data.message}`);
    } finally {
      setLoadingButton(false);
    }
  }
  return (
    <SharedAuth>
      <S.Form id="login-form" noValidate onSubmit={handleSubmit(handleLogin)}>
        <Form.Control
          isInvalid={errors.login_email}
          type="text"
          id="login_email"
          placeholder="Email"
          required
          {...register('login_email', {
            required: 'Email Address is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Valid email required',
            },
          })}
        />
        <Form.Control.Feedback type="invalid">
          {errors.login_email?.message}
        </Form.Control.Feedback>

        <SubmitButton label="Reset Password" loading={loadingButton} />

        <Link to="/login">Back to login</Link>
      </S.Form>
    </SharedAuth>
  );
};

export default ForgotPassword;

const S = {};

S.Form = styled(Form)`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  max-width: 300px;
`;
