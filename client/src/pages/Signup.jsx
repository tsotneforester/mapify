import axios from 'axios';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import SharedAuth from '../components/SharedAuth';

const API_URL = import.meta.env.VITE_API_URL;

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function handleLogin(data) {
    let { signup_email, signup_password, signup_name } = data;
    try {
      const response = await axios.post(`${API_URL}/signup`, {
        email: signup_email,
        password: signup_password,
        name: signup_name,
      });
      sessionStorage.setItem('token', response.data.token);
      sessionStorage.setItem('user', response.data.user);
      sessionStorage.setItem('avatar', response.data.avatar);
      navigate('/mymap'); // Redirect to protected route
    } catch (error) {
      toast.error(`${error.response.data.message}`);
    }
  }

  return (
    <SharedAuth>
      <S.Form
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit(handleLogin)}
      >
        <input
          type="text"
          {...register('username')}
          style={{ position: 'absolute', top: '-9999px' }}
        />
        <input
          type="password"
          {...register('password')}
          style={{ position: 'absolute', top: '-9999px' }}
        />
        <Form.Control
          isInvalid={errors.signup_name}
          type="text"
          placeholder="Name"
          autoComplete="off"
          {...register(`signup_name`, {
            required: 'Name is required',
            pattern: {
              value: /^[a-zA-Z0-9ა-ჰ_-]{1,15}$/,
              message:
                'Valid Username required, max 15 characters of 0-9/a-Z/ა-ჰ/-/_',
            },
          })}
        />
        <Form.Control.Feedback type="invalid">
          {errors.signup_name?.message}
        </Form.Control.Feedback>
        <Form.Control
          isInvalid={errors.signup_email}
          type="text"
          placeholder="Email"
          autoComplete="signup_email"
          {...register('signup_email', {
            required: 'Email Address is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Valid email required',
            },
          })}
        />
        <Form.Control.Feedback type="invalid">
          {errors.signup_email?.message}
        </Form.Control.Feedback>
        <Form.Control
          isInvalid={errors.signup_password}
          type="password"
          placeholder="Password"
          autoComplete="signup_password"
          {...register('signup_password', {
            required: 'Password is required',
            pattern: {
              value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
              message:
                'Valid Password required: at least 8 characters long with minimum 1 uppercase letter, 1 lowercase letter, and 1 number. Can contain special characters',
            },
          })}
        />
        <Form.Control.Feedback type="invalid">
          {errors.signup_password?.message}
        </Form.Control.Feedback>
        <Button style={{ width: '100%' }} type="submit" variant="primary">
          Sign Up
        </Button>
        <p>
          have account? <Link to="/login">log in</Link>
        </p>
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
