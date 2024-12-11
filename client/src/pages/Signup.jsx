import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
const API_URL = import.meta.env.VITE_API_URL;

const Signup = () => {
  const [email, setEmail] = useState('@gmail.com');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/signup`, {
        name,
        email,
        password,
      });
      sessionStorage.setItem('token', response.data.token);
      sessionStorage.setItem('user', response.data.user);
      sessionStorage.setItem('avatar', response.data.avatar);
      navigate('/'); // Redirect to protected route
    } catch (error) {
      console.error('Login failed', error);
      alert('could not sign up');
    }
  };

  return (
    <S.Container>
      <S.Form onSubmit={handleLogin}>
        <Form.Control type="text" placeholder="name" value={name} onChange={e => setName(e.target.value)} />
        <Form.Control type="text" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
        <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        {/* <button type="submit">Login</button> */}

        <Button style={{ width: '100%' }} type="submit" variant="primary">
          Sign Up
        </Button>
      </S.Form>
    </S.Container>
  );
};

export default Signup;

const S = {};
S.Container = styled.div`
  font-family: 'Montserrat', sans-serif;
  min-height: 100svh;
  padding: 0 12px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${prop => prop.theme.body};

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
S.Form = styled.form`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
`;
