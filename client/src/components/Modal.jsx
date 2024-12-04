import styled from 'styled-components';
import { AppContext } from '../Context';
import { useContext } from 'react';

export default function Modal({ children, status }) {
  const { setIsModalOpened } = useContext(AppContext);

  return (
    status && (
      <S.ModalOverlay onClick={() => setIsModalOpened(pre => !pre)}>
        <S.Modal
          onClick={e => {
            e.stopPropagation();
          }}
        >
          {children}
        </S.Modal>
      </S.ModalOverlay>
    )
  );
}

const S = {};

S.ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  width: 100vw;
  height: 100vh;
  height: 100svh;
  background-color: #ffd00051;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`;

S.Modal = styled.div`
  padding: 30px;
  width: 100%;
  max-width: 600px;
  background-color: #009d4479;
  position: relative;
  border-radius: 10px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #0704cb79; /* Adjust the background color as needed */
    filter: blur(5px);
    z-index: -1; /* Ensure the content is on top */
  }
`;
