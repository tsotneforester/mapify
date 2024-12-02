import styled from 'styled-components';

import CloseIcon from '../assets/close.svg?react';

import { useState } from 'react';

export default function Icon({ name, contentType, data, handler, selected, onClickHandler }) {
  const [visible, setVisible] = useState(false);

  return (
    <S.Form border={selected} onClick={onClickHandler} onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)} /* action={`http://localhost:5000/api/icons/delete/${id}`} */ /* method="post" */>
      <img src={`data:${contentType};base64,${data}`} alt={name} />

      {handler && (
        <S.Button active={selected} onClick={handler}>
          <CloseIcon />
        </S.Button>
      )}

      {visible && <S.Tooltip>{name}</S.Tooltip>}
    </S.Form>
  );
}

const S = {};
S.Form = styled.form`
  margin: 10px;
  padding: 6px;
  position: relative;

  width: auto;
  height: auto;
  border-radius: 0;
  background-color: transparent;

  border-width: 3px;
  border-style: solid;
  border-radius: 8px;
  //border-color: ${({ theme }) => theme.colors.gray};
  border-color: ${prop => (prop.border ? ({ theme }) => theme.colors.blue : ({ theme }) => theme.colors.gray)};

  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  transition: border-color linear ${({ theme }) => theme.transition};

  &:hover {
    border-color: ${({ theme }) => theme.colors.blue};
  }

  img {
    width: ${({ theme }) => theme.iconSize};
    height: ${({ theme }) => theme.iconSize};
    border-radius: 0;
    background-color: transparent;
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
  z-index: 1000; /* Ensure it appears above other elements */

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

S.Button = styled.button`
  background-color: transparent;
  position: absolute;
  height: ${prop => (prop.active ? '12px' : 0)};
  opacity: ${prop => (prop.active ? 1 : 0)};
  overflow: hidden;
  top: 0px;
  left: 0px;
  transition: opacity ${({ theme }) => theme.transition} ease;
  cursor: pointer;
`;
