import styled from 'styled-components';

export default function IconsContainer({ children, iconName }) {
  return (
    <>
      <S.Container>
        <S.IconName>
          <p>{iconName}</p>
        </S.IconName>
        {children}
      </S.Container>
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
  overflow: auto;
  width: 100%;
`;
S.IconName = styled.div`
  position: absolute;
  top: -24px;
  right: 8px;
  p {
    font-size: 16px;
    color: #4d4d4d;
    font-weight: 900;
    text-align: center;
    font-style: oblique;
  }
`;
