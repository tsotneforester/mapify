import styled from 'styled-components';
import Loader from './Loader';

export default function IconsContainer({ children, iconName, loading }) {
  if (loading) {
    return (
      <S.Container>
        <Loader loading={loading} style={{ margin: '0 auto' }} />
      </S.Container>
    );
  }

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
  /* align-content: flex-start; */
  justify-content: center;
  align-items: flex-start;
  align-items: center;

  border-radius: 10px;
  gap: 8px;
  min-height: 198px;
  height: auto;
  overflow: auto;
  width: 100%;

  img {
    align-self: center;
  }
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
