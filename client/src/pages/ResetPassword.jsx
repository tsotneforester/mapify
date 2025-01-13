import api from '../axiosInterseptor';
import styled from 'styled-components';
const DEV_ENV = import.meta.env.VITE_DEV_ENV;
import { useNavigate, useParams, Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
// import { AppContext } from '../Context';
import useVerifyProtectedRoute from '../hooks/useVerifyProtectedRoute';
import SharedAuth from '../components/SharedAuth';
import { useState } from 'react';

import SubmitButton from '../components/SubmitButton';

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  let [loadingButton, setLoadingButton] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm(
    DEV_ENV && {
      defaultValues: {
        password: 'Sirw%+45',
        confirmPassword: 'Sirw%+45',
      },
    }
  );

  async function handleLogin(data) {
    let { password, confirmPassword } = data;
    if (password != confirmPassword) {
      return toast.error('Passwords does not match');
    }
    setLoadingButton(true);
    try {
      let response = await api.post(`/api/user/reset-password/${token}`, {
        password,
      });
      navigate('/');
      toast.success(response.data.message);
      reset();
    } catch (error) {
      toast.error(`${error.response.data.message}`);
    } finally {
      setLoadingButton(false);
    }
  }
  useVerifyProtectedRoute();
  return (
    <SharedAuth>
      <S.Form id="login-form" noValidate onSubmit={handleSubmit(handleLogin)}>
        <Form.Control
          isInvalid={errors.password}
          type="password"
          id="password"
          placeholder="Password"
          {...register('password', {
            required: 'Password is required',
            pattern: {
              value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
              message:
                'Valid Password required: at least 8 characters long with minimum 1 uppercase letter, 1 lowercase letter, and 1 number. Can contain special characters',
            },
          })}
        />{' '}
        <Form.Control.Feedback type="invalid">
          {errors.password?.message}
        </Form.Control.Feedback>
        <Form.Control
          isInvalid={errors.confirmPassword}
          type="password"
          id="confirmPassword"
          placeholder="Confirm your password"
          {...register('confirmPassword', {
            required: 'Password is required',
            pattern: {
              value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
              message:
                'Valid Password required: at least 8 characters long with minimum 1 uppercase letter, 1 lowercase letter, and 1 number. Can contain special characters',
            },
          })}
        />
        <Form.Control.Feedback type="invalid">
          {errors.confirmPassword?.message}
        </Form.Control.Feedback>
        <SubmitButton
          label="Submit Password"
          loading={loadingButton}
          style={{ width: '100%', gridArea: 'submit' }}
        />
        <S.Help>
          <Link to="/login">Login</Link>
        </S.Help>
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
S.Help = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  width: 100%;
`;
