import styled from 'styled-components';

const SharedAuth = ({ children }) => {
  return (
    <S.Container>
      <S.Heading>Mapify</S.Heading>
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
