import axios from 'axios';
import { useState } from 'react';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import SharedAuth from '../components/SharedAuth';
import { AppContext } from '../Context';
import Spinner from 'react-bootstrap/Spinner';
const API_URL = import.meta.env.VITE_API_URL;

export default function Login() {
  const navigate = useNavigate();
  let [loadingButton, setLoadingButton] = useState(false);
  // const [message, setMessage] = useState('');
  const { setJustSignedUp } = useContext(AppContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function handleSignup(data) {
    setLoadingButton(true);
    let { signup_name, signup_email, signup_password_1, signup_password_2 } =
      data;
    if (signup_password_1 !== signup_password_2) {
      return toast.warning(`Passwords do not match`);
    }
    try {
      await axios.post(`${API_URL}/signup`, {
        email: signup_email,
        password: signup_password_1,
        passwordConfirm: signup_password_2,
        name: signup_name,
      });
      sessionStorage.setItem('email', signup_email);
      setJustSignedUp(true);
      navigate('/check-email'); // Redirect to protected route
    } catch (error) {
      toast.error(`${error.response.data.message}`);
    } finally {
      setLoadingButton(true);
    }
  }

  return (
    <SharedAuth>
      <S.Form
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit(handleSignup)}
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
          isInvalid={errors.signup_password_1}
          type="password"
          placeholder="Password"
          autoComplete="signup_password_1"
          {...register('signup_password_1', {
            required: 'Password is required',
            pattern: {
              value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
              message:
                'Valid Password required: at least 8 characters long with minimum 1 uppercase letter, 1 lowercase letter, and 1 number. Can contain special characters',
            },
          })}
        />
        <Form.Control.Feedback type="invalid">
          {errors.signup_password_1?.message}
        </Form.Control.Feedback>
        <Form.Control
          isInvalid={errors.signup_password_2}
          type="password"
          placeholder="Password"
          autoComplete="signup_password_2"
          {...register('signup_password_2', {
            required: 'Password is required',
            pattern: {
              value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
              message:
                'Valid Password required: at least 8 characters long with minimum 1 uppercase letter, 1 lowercase letter, and 1 number. Can contain special characters',
            },
          })}
        />
        <Form.Control.Feedback type="invalid">
          {errors.signup_password_2?.message}
        </Form.Control.Feedback>

        <Button
          variant="primary"
          style={{ width: '100%', gridArea: 'submit' }}
          type="submit"
          disabled={loadingButton}
        >
          {loadingButton ? (
            <Spinner as="span" animation="border" size="sm" role="status" />
          ) : (
            'Sign Up'
          )}
        </Button>
        <p>
          have account? <Link to="/login">Log in</Link>
        </p>
      </S.Form>
    </SharedAuth>
  );
}

const S = {};

S.Form = styled(Form)`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  max-width: 300px;
`;
