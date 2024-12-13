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
    let { email, password } = data;
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
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
    <S.Container>
      <S.Heading>Mapify</S.Heading>
      <S.Form noValidate onSubmit={handleSubmit(handleLogin)}>
        <Form.Control
          isInvalid={errors.email}
          type="text"
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

        <Form.Control
          isInvalid={errors.password}
          type="password"
          placeholder="Password"
          {...register('password', {
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(prop) => prop.theme.body};

  background-image: url('/bg1.png'), url('/bg2.svg');
  background-repeat: repeat, no-repeat;
  background-position: 0% 0%, 0% 100%;
  background-size: auto, 100%;
`;

S.Heading = styled.div`
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 4rem;
  margin-bottom: 100px;
  font-family: 'Doto', sans-serif;
  font-weight: 900;
  color: #fff;
  text-shadow: 0 0 5px #ff005e, 0 0 10px #ff005e, 0 0 20px #ff005e,
    0 0 40px #ff005e, 0 0 80px #ff005e;
  animation: glow 1.5s infinite alternate;

  @keyframes glow {
    0% {
      text-shadow: 0 0 5px #ff005e, 0 0 10px #ff005e, 0 0 20px #ff005e,
        0 0 40px #ff005e, 0 0 80px #ff005e;
    }
    100% {
      text-shadow: 0 0 10px #00d4ff, 0 0 20px #00d4ff, 0 0 40px #00d4ff,
        0 0 80px #00d4ff, 0 0 160px #00d4ff;
    }
  }
`;
S.Form = styled(Form)`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  max-width: 300px;
`;
