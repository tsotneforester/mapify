import styled from 'styled-components';
import IconCreateForm from '../components/IconCreateForm';

const Home = () => {
  return (
    <S.Container>
      <p>upload png icon</p>
      <IconCreateForm />
    </S.Container>
  );
};
export default Home;

const S = {};
S.Container = styled.div`
  padding: 50px;

  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
`;
