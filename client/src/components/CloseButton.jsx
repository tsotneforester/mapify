import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import CloseSVG from '../assets/close.svg?react';

const CloseButton = ({ route, color }) => {
  const navigate = useNavigate();

  return (
    <CloseIcon
      onClick={() => {
        navigate(route);
      }}
      style={{ color }}
    />
  );
};

export default CloseButton;

const CloseIcon = styled(CloseSVG)`
  position: absolute;
  top: 4px;
  right: 18px;
  width: 24px;
  cursor: pointer;
`;
