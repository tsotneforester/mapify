import styled, { css } from 'styled-components';
import { useState } from 'react';
import api from '../axiosInterseptor';
import 'react-loading-skeleton/dist/skeleton.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import EyeSVG from '../assets/eye.svg?react';
import EyeOffSVG from '../assets/eyeOff.svg?react';

import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import CamoContainer from '../components/CamoContainer';
import CloseButton from '../components/CloseButton';
const DEV_ENV = import.meta.env.VITE_DEV_ENV;

const ChangePassword = () => {
  const navigate = useNavigate();

  const [inputTypeText, setInputTypeText] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm(
    DEV_ENV && {
      defaultValues: {
        originalPassword: 'Sirw%+',
        newPassword: 'Sirw%+',
        confirmPassword: 'Sirw%+',
      },
    }
  );

  async function changeHandler(data) {
    try {
      let response = await api.post(`/api/user/change-password/`, data);
      await api.post(`/api/auth/logout`);
      navigate('/login');
      toast.success(response.data.message);
    } catch (error) {
      toast.error(`${error.response.data.message}`);
    } finally {
      // setLoadingButton(false);
    }
  }

  const onSubmit = (data) => {
    changeHandler(data);
  };

  const newPassword = watch('newPassword');

  return (
    <CamoContainer>
      <CloseButton color="#e3858589" route="/user" />
      {inputTypeText ? (
        <EyeIcon onClick={() => setInputTypeText((e) => !e)} />
      ) : (
        <EyeOffIcon onClick={() => setInputTypeText((e) => !e)} />
      )}
      <S.Heading>Change Password</S.Heading>
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="originalPassword">
          <Form.Control
            type={inputTypeText ? 'text' : 'password'}
            placeholder="Enter original password"
            {...register('originalPassword', {
              required: 'Original password is required',
            })}
            isInvalid={!!errors.originalPassword}
          />
          <Form.Control.Feedback type="invalid">
            {errors.originalPassword?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="newPassword">
          <Form.Control
            type={inputTypeText ? 'text' : 'password'}
            placeholder="Enter new password"
            {...register('newPassword', {
              required: 'New password is required',
            })}
            isInvalid={!!errors.newPassword}
          />
          <Form.Control.Feedback type="invalid">
            {errors.newPassword?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="confirmPassword">
          <Form.Control
            type={inputTypeText ? 'text' : 'password'}
            placeholder="Confirm new password"
            {...register('confirmPassword', {
              required: 'Please confirm your new password',
              validate: (value) =>
                value === newPassword || 'Passwords do not match',
            })}
            isInvalid={!!errors.confirmPassword}
          />
          <Form.Control.Feedback type="invalid">
            {errors.confirmPassword?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit">
          Change
        </Button>
      </S.Form>
    </CamoContainer>
  );
};

export default ChangePassword;

const S = {};

const eye = css`
  position: absolute;
  top: 12px;
  left: 20px;
`;

const EyeOffIcon = styled(EyeOffSVG)`
  ${eye}
`;

const EyeIcon = styled(EyeSVG)`
  ${eye}
`;

S.Heading = styled.h1`
  font-size: 22px;
  color: black;
  font-weight: 700;
  text-align: center;
  margin: 20px 0 10px 0;
`;

S.Form = styled(Form)`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  gap: 20px;
  padding: 20px;
`;
