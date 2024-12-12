import axios from 'axios';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const API_URL = import.meta.env.VITE_API_URL;

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function handleLogin(data) {
    let { email, password, name } = data;
    try {
      const response = await axios.post(`${API_URL}/signup`, {
        email,
        password,
        name,
      });
      sessionStorage.setItem('token', response.data.token);
      sessionStorage.setItem('user', response.data.user);
      sessionStorage.setItem('avatar', response.data.avatar);
      navigate('/'); // Redirect to protected route
    } catch (error) {
      toast.error(`${error.response.data.error}`);
    }
  }

  return (
    <S.Container>
      <S.Form noValidate onSubmit={handleSubmit(handleLogin)}>
        <Form.Control
          isInvalid={errors.name}
          type="text"
          placeholder="username"
          {...register('name', {
            required: 'Username is required',
            pattern: {
              value: /^[a-zA-Z0-9ა-ჰ_-]{1,15}$/,
              message:
                'Valid Username required, max 15 characters of 0-9/a-Z/ა-ჰ/-/_',
            },
          })}
        />
        <Form.Control.Feedback type="invalid">
          {errors.name?.message}
        </Form.Control.Feedback>

        <Form.Control
          isInvalid={errors.email}
          type="text"
          placeholder="Email"
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

        <Form.Control
          isInvalid={errors.password}
          type="password"
          placeholder="Password"
          {...register('password', {
            required: 'Password is required',
            pattern: {
              value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g,
              message:
                'Valid Password required: at least 8 characters long with minimum 1 uppercase letter, 1 lowercase letter, and 1 number. Can contain special characters',
            },
          })}
        />
        <Form.Control.Feedback type="invalid">
          {errors.password?.message}
        </Form.Control.Feedback>

        <Button style={{ width: '100%' }} type="submit" variant="primary">
          Sign Up
        </Button>
        <p>
          have account? <Link to="/login">log in</Link>
        </p>
      </S.Form>
    </S.Container>
  );
};

export default Login;

const S = {};
S.Container = styled.div`
  font-family: 'Montserrat', sans-serif;
  min-height: 100svh;
  padding: 0 12px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${(prop) => prop.theme.body};

  background-image: url('/bg1.png'), url('/bg2.svg');
  background-repeat: repeat, no-repeat;
  background-position: 0% 0%, 0% 100%;
  background-size: auto, 100%;

  /* background-image: url('image1.jpg'), url('image2.jpg');
  background-repeat: repeat; //repeat-y/repeat-x/no-repeat/space/round
  background-position: 0% 0%; // center/bottom/left/right/(%, px)
  background-attachment: scroll; //fixed / local
  background-size: auto; //length/cover/contain */
`;
S.Form = styled(Form)`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  max-width: 300px;
`;
