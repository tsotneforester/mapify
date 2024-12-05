import styled from 'styled-components';
import CloseIcon from '../assets/close.svg?react';

export default function Icon({ name, contentType, data, handler, selected, onClickHandler }) {
  return (
    <S.Form active={selected} border={selected} onClick={onClickHandler} /* action={`http://localhost:5000/api/icons/delete/${id}`} */ /* method="post" */>
      <img src={`data:${contentType};base64,${data}`} alt={name} />

      {handler && (
        <S.Button active={selected} onClick={handler}>
          <CloseIcon />
        </S.Button>
      )}

      {/* {visible && <S.Tooltip>{name}</S.Tooltip>} */}
    </S.Form>
  );
}

const S = {};
S.Form = styled.form`
  padding: 8px;
  position: relative;

  width: auto;
  height: auto;
  border-radius: 0;
  /* background-color: #ffffffd9; */
  background-color: ${prop => (prop.active ? '#434343d9' : '#ffffffd9')};

  border-width: 3px;
  border-style: solid;
  border-radius: 8px;
  //border-color: ${({ theme }) => theme.colors.gray};
  border-color: ${prop => (prop.border ? ({ theme }) => theme.colors.blue : '#a4bed2')};

  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  transition: border-color linear ${({ theme }) => theme.transition};

  &:hover {
    border-color: ${({ theme }) => theme.colors.blue};
  }

  img {
    width: 36px;
  }
`;
S.Tooltip = styled.div`
  position: absolute;
  bottom: 120%; /* Position above the text */
  left: 50%;
  transform: translateX(-50%);
  background-color: ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.white};
  padding: 5px;
  border-radius: 4px;
  white-space: nowrap;
  z-index: 9999; /* Ensure it appears above other elements */

  &::after {
    content: '';
    position: absolute;
    top: 100%; /* Position the arrow below the tooltip */
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: ${({ theme }) => theme.colors.blue} transparent transparent transparent; /* Arrow color */
  }
`;

S.Button = styled.div`
  margin: 0;
  padding: 0;
  background-color: transparent;
  position: absolute;
  height: ${prop => (prop.active ? '26px' : 0)};
  opacity: ${prop => (prop.active ? 1 : 0)};
  overflow: hidden;
  top: 0;
  left: 0;
  transition: opacity ${({ theme }) => theme.transition} ease;
  cursor: pointer;
  line-height: 4px;
`;
