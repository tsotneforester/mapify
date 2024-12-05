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
  align-content: flex-start;
  justify-content: center;
  align-items: flex-start;
  border-radius: 10px;
  gap: 8px;
  height: 198px;
  overflow: hidden;
  width: 100%;
`;
