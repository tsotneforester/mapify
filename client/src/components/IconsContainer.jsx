import styled from 'styled-components';
import Loader from './Loader';

export default function IconsContainer({ loading, children }) {
  return (
    <S.Container>
      <Loader loading={loading} />

      {children}
    </S.Container>
  );
}

const S = {};

S.Container = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: flex-start;
  border-radius: 10px;
  gap: 8px;
`;
