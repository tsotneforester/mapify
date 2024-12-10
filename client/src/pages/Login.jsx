import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password,
      });
      localStorage.setItem('token', response.data.token); // Save token to localStorage
      navigate('/'); // Redirect to protected route
    } catch (error) {
      console.error('Login failed', error);
      alert('Invalid credentials');
    }
  };

  return (
    <S.Container>
      <S.Form onSubmit={handleLogin}>
        <Form.Control type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        {/* <button type="submit">Login</button> */}

        <Button style={{ width: '100%' }} type="submit" variant="primary">
          Login
        </Button>
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
