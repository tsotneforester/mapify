import axios from 'axios';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import SharedAuth from '../components/SharedAuth';
import { useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const API_URL = import.meta.env.VITE_API_URL;

const Login = () => {
  const navigate = useNavigate();
  const recaptchaRef = useRef();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      login_password: 'Sirw%+50',
      login_email: 'tsotne.meladze.usa@gmail.com',
    },
  });

  async function handleLogin(data) {
    const recaptchaToken = recaptchaRef.current.getValue();
    //recaptchaRef.current.reset();

    let { login_email, login_password } = data;
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email: login_email,
        password: login_password,
        recaptchaToken,
      });
      sessionStorage.setItem('token', response.data.token);
      sessionStorage.setItem('user', response.data.user);
      sessionStorage.setItem('avatar', response.data.avatar);
      navigate('/'); // Redirect to protected route
    } catch (error) {
      toast.error(`${error.response.data.message}`);
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
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey="6LcccKEqAAAAAApe09zfARz-zs2Nf87tmGJ5Vo72"
        />
        <Button style={{ width: '100%' }} type="submit" variant="primary">
          Login
        </Button>
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
