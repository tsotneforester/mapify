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
    let { login_email, login_password } = data;
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email: login_email,
        password: login_password,
      });
      sessionStorage.setItem('token', response.data.token);
      sessionStorage.setItem('user', response.data.user);
      sessionStorage.setItem('avatar', response.data.avatar);
      navigate('/mymap'); // Redirect to protected route
    } catch (error) {
      toast.error(`${error.response.data.error}`);
    }
  }

  return (
    <SharedAuth>
      <S.Form noValidate onSubmit={handleSubmit(handleLogin)}>
        <Form.Control
          isInvalid={errors.email}
          type="text"
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
          {errors.email?.message}
        </Form.Control.Feedback>

        <Form.Control
          isInvalid={errors.password}
          type="password"
          placeholder="Password"
          {...register('login_password', {
            required: 'Password is required',
          })}
        />
        <Form.Control.Feedback type="invalid">
          {errors.password?.message}
        </Form.Control.Feedback>
        {/* <Form.Text id="passwordHelpBlock" muted>
          Your password must be at least 8 characters long with minimum 1
          uppercase letter, 1 lowercase letter, and 1 number. Can contain
          special characters
        </Form.Text> */}

        <Button style={{ width: '100%' }} type="submit" variant="primary">
          Login
        </Button>
        <p>
          No acoount? <Link to="/signup">sign up</Link>
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
