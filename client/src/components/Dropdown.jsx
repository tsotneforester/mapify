import { useState } from 'react';
import ArrowSvg from '../assets/arrow.svg?react';
import styled from 'styled-components';
import ScaleLoader from 'react-spinners/ScaleLoader';
import useFetchIcons from '../hooks/useFetchIcons';

export default function Dropdown({
  /* data, */ selectHandler,
  selected = null,
}) {
  const [isOptionBoxVisible, setIsOptionBoxVisible] = useState(false);
  const [activeId, setActiveId] = useState(selected);
  const [searchString, setSearchString] = useState('');

  const { data, loading } = useFetchIcons('api/icons');

  const filteredData = data.filter((iconName) =>
    iconName.name.toLowerCase().includes(searchString)
  );

  const activeIcon = data.find((icon) => icon.id === activeId);

  const handleChange = (event) => {
    setSearchString(event.target.value);
  };

  return (
    <S.Container>
      <S.DropDown>
        <S.Select
          onClick={() => {
            setIsOptionBoxVisible((e) => !e);
            // fetchAllIcons();
          }}
        >
          <div>
            {activeIcon ? (
              <>
                <img src={activeIcon.url} alt={activeIcon.name} />
                <p style={{ color: activeId ? 'black' : '#999' }}>
                  {activeIcon.name}
                </p>
              </>
            ) : (
              <p style={{ color: activeId ? 'black' : '#999' }}>Select Icon</p>
            )}
          </div>
          <ArrowSvg />
        </S.Select>

        {isOptionBoxVisible && (
          <S.OptionsBox>
            <S.SearchBox>
              <input
                type="text"
                value={searchString}
                placeholder="search"
                onChange={handleChange}
              />
            </S.SearchBox>
            <S.Options>
              {loading ? (
                <ScaleLoader
                  style={{ margin: '0 auto' }}
                  height={24}
                  radius={6}
                  color="#a3a3a3"
                />
              ) : filteredData.length == 0 ? (
                'Icon list is empty'
              ) : (
                filteredData.map((option) => {
                  const { name, url, id } = option;
                  return (
                    <S.Option
                      $active={name == activeId}
                      onClick={() => {
                        setIsOptionBoxVisible((e) => !e);
                        setActiveId(id);
                        selectHandler(id);
                        setSearchString('');
                      }}
                      key={id}
                    >
                      <img src={url} alt={name} />
                      <p>{name}</p>
                    </S.Option>
                  );
                })
              )}
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
  grid-area: search;
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

  & > div {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    gap: 12px;
    align-items: center;
  }

  img {
    width: 28px;
  }
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
  border: 1px solid gray;
  border-radius: 4px;
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
  background-color: ${(prop) => (prop.$active ? 'red' : 'transparent')};
  cursor: pointer;

  &:hover {
    background-color: #7bab78;
  }
  img {
    width: 22px;
  }
`;
