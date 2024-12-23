import axios from 'axios';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { AppContext } from '../Context';
import SharedAuth from '../components/SharedAuth';
import { useState, useContext, useEffect, useCallback, useMemo } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function checkToken(token) {
    try {
      const response = await axios.post(
        `${API_URL}/check-reset-token/${token}`
      );
      // sessionStorage.setItem('token', response.data.token);
      // sessionStorage.setItem('user', response.data.user);
      // sessionStorage.setItem('avatar', response.data.avatar);
      // Redirect to protected route
      // toast.success(`password reseted`);
    } catch (error) {
      toast.error(`${error.response.data.message}`);
      navigate('/login');
    }
  }

  async function handleLogin(data) {
    let { login_password } = data;
    try {
      const response = await axios.post(`${API_URL}/reset/${token}`, {
        password: login_password,
      });
      // sessionStorage.setItem('token', response.data.token);
      // sessionStorage.setItem('user', response.data.user);
      // sessionStorage.setItem('avatar', response.data.avatar);
      navigate('/login'); // Redirect to protected route
      toast.success(`password reseted`);
      setJustReseted(true);
    } catch (error) {
      toast.error(`${error.response.data.message}`);
    }
  }
  useEffect(() => {
    checkToken(token);
  }, []);
  return (
    <SharedAuth>
      <S.Form id="login-form" noValidate onSubmit={handleSubmit(handleLogin)}>
        <Form.Control
          isInvalid={errors.login_password}
          type="password"
          id="login_password"
          placeholder="Password"
          {...register('login_password', {
            required: 'Password is required',
          })}
        />
        <Form.Control.Feedback type="invalid">
          {errors.login_password?.message}
        </Form.Control.Feedback>

        <Button
          style={{ width: '100%', textTransform: 'uppercase' }}
          type="submit"
          variant="primary"
        >
          Submit password
        </Button>
      </S.Form>
    </SharedAuth>
  );
};

export default ResetPassword;

const S = {};

S.Form = styled(Form)`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  max-width: 300px;
`;
