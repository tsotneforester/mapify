import styled from 'styled-components';

export default function IconsContainer({ children }) {
  return (
    <>
      <S.Container>{children}</S.Container>
    </>
  );
}

const S = {};

S.Container = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  gap: 8px;
`;
