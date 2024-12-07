import { useState } from 'react';

import ArrowSvg from '../assets/arrow.svg?react';

import styled from 'styled-components';

export default function Dropdown({ data }) {
  const [isOptionBoxVisible, setIsOptionBoxVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('select icon');
  const [searchString, setSearchString] = useState('');

  const filteredData = data.filter(iconName => iconName.name.toLowerCase().includes(searchString));

  const handleChange = event => {
    setSearchString(event.target.value);
  };

  return (
    <S.Container>
      <S.DropDown>
        <S.Select onClick={() => setIsOptionBoxVisible(e => !e)}>
          <p>{selectedOption}</p>
          <ArrowSvg />
        </S.Select>

        {isOptionBoxVisible && (
          <S.OptionsBox>
            <S.SearchBox>
              <input type="text" value={searchString} placeholder="search" onChange={handleChange} />
            </S.SearchBox>
            <S.Options>
              {filteredData.map((option, i) => {
                const { mimetype, name, imgData } = option;
                return (
                  <S.Option
                    active={name == selectedOption}
                    onClick={() => {
                      setIsOptionBoxVisible(e => !e);
                      setSelectedOption(name);
                    }}
                    key={i}
                  >
                    <img src={`data:${mimetype};base64,${imgData}`} alt={name} />
                    <p>{name}</p>
                  </S.Option>
                );
              })}
            </S.Options>
          </S.OptionsBox>
        )}
      </S.DropDown>
    </S.Container>
  );
}

const S = {};
S.Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;

  width: 100%;
`;
S.DropDown = styled.div``;
S.Select = styled.div`
  border-radius: 5px;
  /* border: 1px solid green; */
  background-color: #ffffff;
  padding: 0.375rem 0.75rem;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
`;
S.OptionsBox = styled.div`
  margin-top: 10px;
  background-color: white;
  border-radius: 5px;
  padding: 4px;

  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  gap: 10px;
`;
S.SearchBox = styled.div`
  border: 1px solid;
  padding: 4px;
  input {
    border: none;
  }
`;

S.Options = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  gap: 8px;
  max-height: 200px;
  overflow: auto;
`;

S.Option = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  background-color: ${prop => (prop.active ? 'red' : 'transparent')};

  img {
    width: 22px;
  }
`;
