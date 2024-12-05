import styled from 'styled-components';
import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { AppContext } from '../Context';
import DefaultMap from '../components/DefaultMap';
const API_URL = import.meta.env.VITE_API_URL;
import { useMapEvents } from 'react-leaflet';
import AddMarkerSvg from '../assets/addmarker.svg?react';
import HexSvg from '../assets/hex.svg?react';
import Modal from '../components/Modal';
import IconsManager from './IconsManager';
import MarkerManager from './MarkerManager';

export default function MyMap() {
  const [markers, setMarkers] = useState([]);
  const [coords, setCoords] = useState({
    lat: '',
    lng: '',
  });
  const { isModalOpened, setIsModalOpened } = useContext(AppContext);
  const [activeModalContent, setActiveModalContent] = useState();

  async function fetchMyMarkers() {
    try {
      const response = await axios(`${API_URL}/api/mymap`);
      setMarkers(response.data.data);
    } catch (error) {
      console.error('Error fetching markers:', error);
    }
  }

  function MapEventsHandler() {
    useMapEvents({
      click: e => {
        const { lat, lng } = e.latlng;

        setCoords({ lat, lng });
      },
    });
    return null;
  }

  function isObjectValuesNotEmpty(obj) {
    if (typeof obj !== 'object' || obj === null) {
      return false;
    }

    for (const value of Object.values(obj)) {
      if (value === null || value === undefined || (typeof value === 'string' && value.trim() === '') || (Array.isArray(value) && value.length === 0) || (typeof value === 'object' && Object.keys(value).length === 0)) {
        return false;
      }
    }

    return true;
  }

  useEffect(() => {
    fetchMyMarkers();
  }, []);

  return (
    <>
      <S.Map>
        <DefaultMap zoom={8} data={markers} editable={true} forceRender={() => fetchMyMarkers()} point={Object.values(coords)}>
          <MapEventsHandler />
        </DefaultMap>
      </S.Map>

      <S.MapTools>
        <AddMarkerIcon
          enabled={isObjectValuesNotEmpty(coords)}
          onClick={() => {
            setIsModalOpened(e => !e);
            setActiveModalContent('markers');
          }}
        />

        <HexIcon
          enabled={true}
          onClick={() => {
            setIsModalOpened(e => !e);
            setActiveModalContent('icons');
          }}
        />
      </S.MapTools>

      <Modal status={isModalOpened}>
        {activeModalContent == 'icons' && <IconsManager />}
        {activeModalContent == 'markers' && <MarkerManager fetchMyMarkers={() => fetchMyMarkers()} coordinates={{ coords, setCoords }} />}
      </Modal>
    </>
  );
}

const S = {};
S.Map = styled.div`
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
  cursor: ${prop => (prop.enabled ? 'pointer' : 'not-allowed')};
  color: ${prop => (prop.enabled ? 'green' : '	#D3D3D3')};
`;

const HexIcon = styled(HexSvg)`
  width: 32px;
  height: 32px;
  cursor: ${prop => (prop.enabled ? 'pointer' : 'not-allowed')};
  color: ${prop => (prop.enabled ? 'green' : '	#D3D3D3')};
`;

S.MapTools = styled.div`
  position: absolute;
  right: 2px;
  bottom: 20px;
  z-index: 30;
  padding: 4px;
  border-radius: 4px;
  background-color: #fff;
  border: 2px solid rgba(0, 0, 0, 0.2);
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  gap: 14px;
`;
