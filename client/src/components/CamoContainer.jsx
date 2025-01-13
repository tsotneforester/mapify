import styled from 'styled-components';

import 'react-loading-skeleton/dist/skeleton.css';
import mapbg from '../assets/mappattern.png';

const CamoContainer = ({ children }) => {
  return (
    <S.Container>
      <S.ProfileCard>{children}</S.ProfileCard>
    </S.Container>
  );
};

export default CamoContainer;

const S = {};

S.Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  background-color: #abc5ab;
  min-height: 100vh;
  min-height: 100svh;
  padding: 16px;
  background-image: url(${mapbg});
  background-repeat: repeat; //repeat-y/repeat-x/no-repeat/space/round
  background-position: 0% 0%; // center/bottom/left/right/(%, px)
  background-attachment: scroll; //fixed / local
  background-size: auto; //length/cover/contain
`;

S.ProfileCard = styled.div`
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  max-width: 450px;
  width: 100%;
`;
