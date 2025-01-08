import api from '../axiosInterseptor';
import { useState } from 'react';
import styled from 'styled-components';

import { Link, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import SharedAuth from '../components/SharedAuth';

const DEV_ENV = import.meta.env.VITE_DEV_ENV;
import SubmitButton from '../components/SubmitButton';

const Login = () => {
  let [loadingButton, setLoadingButton] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(
    DEV_ENV && {
      defaultValues: {
        login_password: 'Sirw%+45',
        login_email: 'tsotne.meladze.usa@gmail.com',
      },
    }
  );

  async function handleLogin(data) {
    setLoadingButton(true);

    let { login_email, login_password } = data;
    try {
      const response = await api.post(`/api/login`, {
        email: login_email,
        password: login_password,
      });

      sessionStorage.setItem('user', response.data.user);
      sessionStorage.setItem('avatar', response.data.avatar);
      navigate('/'); // Redirect to protected route

      // await axios.get(`${API_URL}/get-cookie`, {
      //   withCredentials: true,
      // });
    } catch (error) {
      if (error.response.data.message == 'check email for verification') {
        toast.success(`${error.response.data.message}`);
      } else {
        toast.error(`${error.response.data.message}`);
      }
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

        <SubmitButton
          label="Login"
          loading={loadingButton}
          style={{ width: '100%', gridArea: 'submit' }}
        />

        <S.Help>
          <Link to="/forgot-password">Forgot Password?</Link>
          <Link to="/signup">Sign up</Link>
        </S.Help>
      </S.Form>
    </SharedAuth>
  );
};

export default Login;

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
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  width: 100%;
`;
