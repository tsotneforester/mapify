import styled from 'styled-components';
import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { AppContext } from '../Context';
import DefaultMap from '../components/DefaultMap';
const API_URL = import.meta.env.VITE_API_URL;

import AddMarkerSvg from '../assets/addmarker.svg?react';
import Modal from '../components/Modal';
import Icons from './Icons';

export default function MyMap() {
  const [markers, setMarkers] = useState([]);
  const { isModalOpened, setIsModalOpened } = useContext(AppContext);

  async function fetchMyMarkers() {
    try {
      const response = await axios(`${API_URL}/api/mymap`);
      setMarkers(response.data.data);
      //toast.success(response.data.status);
    } catch (error) {
      console.error('Error fetching markers:', error);
    }
  }

  useEffect(() => {
    fetchMyMarkers();
  }, []);

  return (
    <>
      <S.Container>
        <DefaultMap zoom={8} data={markers} editable={true} forceRender={() => fetchMyMarkers()} />
      </S.Container>
      <AddMarkerIcon
        onClick={() => {
          console.log('hi');
          setIsModalOpened(e => !e);
        }}
      />
      <Modal status={isModalOpened}>
        <Icons />
      </Modal>
    </>
  );
}

const S = {};
S.Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  height: 100svh;
  z-index: 0;
`;

const AddMarkerIcon = styled(AddMarkerSvg)`
  width: 32px;
  height: 32px;
  position: absolute;
  right: 20px;
  top: 20px;
  z-index: 30;
`;
