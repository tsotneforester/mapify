import styled from 'styled-components';
import wind from '../assets/wind.png';
export default function NoContent() {
  return (
    <S.Container>
      <h1>Nothing!!!</h1>
      <img src={wind} alt="No Content" />
      <p>your icons collection is empty</p>
    </S.Container>
  );
}
const S = {};
S.Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  padding: 12px;
  gap: 10px;
  h1,
  p {
    font-family: 'Doto', sans-serif;
    font-weight: 900;

    color: black;
    text-align: center;
  }

  h1 {
    font-size: 28px;
  }
  p {
    font-size: 18px;
  }
`;
