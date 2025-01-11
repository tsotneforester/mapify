import styled from 'styled-components';
import { useState } from 'react';

import api from '../axiosInterseptor';
import 'react-loading-skeleton/dist/skeleton.css';
import mapbg from '../assets/mappattern.png';

import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import EyeSVG from '../assets/eye.svg?react';
import EyeOffSVG from '../assets/eyeOff.svg?react';

import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
const DEV_ENV = import.meta.env.VITE_DEV_ENV;

const PasswordChange = () => {
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
    <S.Container
      onClick={() => {
        navigate('/user');
      }}
    >
      <S.ProfileCard
        onClick={
          (e) => {
            e.stopPropagation();
          } // Prevent click from propagating to the container
        }
      >
        {inputTypeText ? (
          <EyeSVG onClick={() => setInputTypeText((e) => !e)} />
        ) : (
          <EyeOffSVG onClick={() => setInputTypeText((e) => !e)} />
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
            Submit
          </Button>
        </S.Form>
      </S.ProfileCard>
    </S.Container>
  );
};

export default PasswordChange;

const S = {};
S.Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  background-color: #abc5ab;
  min-height: 100vh;
  min-height: 100svh;
  padding: 20px;
  background-image: url(${mapbg});
  background-repeat: repeat; //repeat-y/repeat-x/no-repeat/space/round
  background-position: 0% 0%; // center/bottom/left/right/(%, px)
  background-attachment: scroll; //fixed / local
  background-size: auto; //length/cover/contain
`;

S.ProfileCard = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  max-width: 450px;
  width: 100%;
  padding: 30px;
`;

S.Heading = styled.div`
  font-size: 22px;
  color: black;
  font-weight: 700;
  text-align: center;
  margin-bottom: 30px;
`;

S.Form = styled(Form)`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  gap: 20px;
`;
