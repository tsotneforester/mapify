import styled from 'styled-components';
import Button from 'react-bootstrap/Button';

const ConfirmationModal = ({ children, onClose, onConfirm }) => {
  return (
    <S.Background onClick={onClose}>
      <S.Container onClick={(e) => e.stopPropagation()}>
        {children}

        <S.ButtonContainer>
          <Button
            onClick={onClose}
            style={{ width: '100%' }}
            type="submit"
            variant="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            style={{ width: '100%' }}
            type="submit"
            variant="primary"
          >
            Confirm
          </Button>
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
  max-width: 450px;
`;
S.ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 50px;
  margin-top: 20px;
`;
