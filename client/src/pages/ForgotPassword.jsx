import api from '../axiosInterseptor';
import styled from 'styled-components';
import useVerifyProtectedRoute from '../hooks/useVerifyProtectedRoute';
import { Link, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import SharedAuth from '../components/SharedAuth';
import { useState } from 'react';
const DEV_ENV = import.meta.env.VITE_DEV_ENV;
import SubmitButton from '../components/SubmitButton';
const ForgotPassword = () => {
  const navigate = useNavigate();
  let [loadingButton, setLoadingButton] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(
    DEV_ENV && {
      defaultValues: {
        email: 'tsotne.meladze.usa@gmail.com',
      },
    }
  );

  async function handleLogin(data) {
    let { email } = data;
    setLoadingButton(true);
    try {
      const response = await api.post(`/api/user/forgot-password`, {
        email,
      });

      navigate('/login'); // Redirect to protected route
      toast.success(`${response.data.message}`);
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
          isInvalid={errors.email}
          type="text"
          id="email"
          placeholder="Email"
          required
          {...register('email', {
            required: 'Email Address is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Valid email required',
            },
          })}
        />
        <Form.Control.Feedback type="invalid">
          {errors.email?.message}
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
