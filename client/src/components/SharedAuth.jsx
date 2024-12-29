import styled from 'styled-components';
import { version } from '../../package.json';
import grassImg from '../assets/grass.png';
import bg from '../assets/bg.png';

const SharedAuth = ({ children }) => {
  return (
    <S.Container>
      <S.Heading>
        <h1>Mapify</h1>
        <h2>V {version.slice(0, version.lastIndexOf('.'))}</h2>
      </S.Heading>
      {children}
    </S.Container>
  );
};

export default SharedAuth;

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

  background-image: url(${bg}), url(${grassImg});
  background-repeat: repeat, repeat-x;
  background-position: 0% 0%, center 110%;
  background-size: auto, auto;
`;

S.Heading = styled.div`
  //position: absolute;
  top: 100px;
  left: 50%;
  //transform: translateX(-50%);
  font-family: 'Doto', sans-serif;
  font-weight: 900;
  margin-bottom: 40px;

  h1 {
    font-size: 4rem;

    text-shadow: 0 0 5px #ff005e, 0 0 10px #ff005e, 0 0 20px #ff005e,
      0 0 40px #ff005e, 0 0 80px #ff005e;
    animation: glow 1.5s infinite alternate;

    @keyframes glow {
      0% {
        text-shadow: 0 0 5px #ff005e, 0 0 10px #ff005e, 0 0 20px #ff005e,
          0 0 40px #ff005e, 0 0 80px #ff005e;
        color: #ff005e;
      }
      100% {
        text-shadow: 0 0 10px #00d4ff, 0 0 20px #00d4ff, 0 0 40px #00d4ff,
          0 0 80px #00d4ff, 0 0 160px #00d4ff;
        color: #00d4ff;
      }
    }
  }

  h2 {
    font-size: 16px;
    color: black;
    font-weight: 700;
    text-align: center;
  }
`;
