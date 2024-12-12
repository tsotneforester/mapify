import PulseLoader from 'react-spinners/PulseLoader';
import styled from 'styled-components';

export default function Loader({ loading }) {
  return (
    <S.Container $loading={loading}>
      <PulseLoader
        color="#0008887d"
        loading={loading}
        size={15}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </S.Container>
  );
}
const S = {};
S.Container = styled.div`
  width: 100%;
  height: ${(prop) => (prop.$loading ? '100%' : '0px')};
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
`;
