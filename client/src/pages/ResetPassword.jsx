import api from '../axiosInterseptor';
import styled from 'styled-components';

import { useNavigate, useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
// import { AppContext } from '../Context';

import SharedAuth from '../components/SharedAuth';
import { useState, useEffect } from 'react';

import SubmitButton from '../components/SubmitButton';

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  let [loadingButton, setLoadingButton] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function handleLogin(data) {
    let { login_password } = data;
    setLoadingButton(true);
    try {
      let response = await api.post(`/api/user/reset-password/${token}`, {
        password: login_password,
      });
      navigate('/');

      toast.success(response.data.message);
    } catch (error) {
      toast.error(`${error.response.data.message}`);
    } finally {
      setLoadingButton(false);
    }
  }

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

        <SubmitButton
          label="Submit Password"
          loading={loadingButton}
          style={{ width: '100%', gridArea: 'submit' }}
        />
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
