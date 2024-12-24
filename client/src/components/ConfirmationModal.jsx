import styled from 'styled-components';

const ConfirmationModal = ({ onClose, onConfirm }) => {
  return (
    <S.Background onClick={onClose}>
      <S.Container onClick={(e) => e.stopPropagation()}>
        <h2>Are you sure?</h2>
        <p>Do you really want to sign out?</p>
        <S.ButtonContainer>
          <button onClick={onClose}>Cancel</button>
          <button onClick={onConfirm}>Confirm</button>
        </S.ButtonContainer>
      </S.Container>
    </S.Background>
  );
};

export default ConfirmationModal;

const S = {};
S.Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;
S.Container = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;
S.ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
