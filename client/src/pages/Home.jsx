import styled from 'styled-components';
import api from '../axiosInterseptor';
import { useEffect, useState, useContext } from 'react';
import { AppContext } from '../Context';
import DefaultMap from '../components/DefaultMap';
import { useMapEvents } from 'react-leaflet';
import AddMarkerSvg from '../assets/addmarker.svg?react';
import HexSvg from '../assets/hex.svg?react';
import CartSvg from '../assets/cart.svg?react';
import Modal from '../components/Modal';
import IconsManager from '../components/IconsManager';
import MarkerManager from '../components/MarkerManager';
import PaymentManager from '../components/PaymentManager';

export default function Home() {
  const [markers, setMarkers] = useState([]);
  const [coords, setCoords] = useState({
    lng: '',
    lat: '',
  });
  const { isModalOpened, setIsModalOpened } = useContext(AppContext);
  const [activeModalContent, setActiveModalContent] = useState();

  async function fetchMarkers() {
    try {
      const response = await api(`/api/markers`);
      setMarkers(response.data.data);
    } catch (error) {
      console.error('Error fetching markers:', error);
    }
  }

  function MapEventsHandler() {
    useMapEvents({
      click: (e) => {
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
      if (
        value === null ||
        value === undefined ||
        (typeof value === 'string' && value.trim() === '') ||
        (Array.isArray(value) && value.length === 0) ||
        (typeof value === 'object' && Object.keys(value).length === 0)
      ) {
        return false;
      }
    }

    return true;
  }

  useEffect(() => {
    fetchMarkers();
  }, []);

  return (
    <>
      <S.Map>
        <DefaultMap
          zoom={8}
          data={markers}
          editable={true}
          forceRender={() => fetchMarkers()}
          point={Object.values(coords)}
        >
          <MapEventsHandler />
        </DefaultMap>
      </S.Map>

      <S.MapTools>
        <AddMarkerIcon
          $enabled={isObjectValuesNotEmpty(coords)}
          onClick={() => {
            setIsModalOpened((e) => !e);
            setActiveModalContent('markers');
          }}
        />
        <HexIcon
          $enabled={true}
          onClick={() => {
            setIsModalOpened((e) => !e);
            setActiveModalContent('icons');
          }}
        />
        <CartIcon
          $enabled={true}
          onClick={() => {
            setIsModalOpened((e) => !e);
            setActiveModalContent('payment');
          }}
        />
      </S.MapTools>

      <Modal status={isModalOpened}>
        {activeModalContent == 'markers' && (
          <MarkerManager
            fetchMyMarkers={() => fetchMarkers()}
            coordinates={{ coords, setCoords }}
          />
        )}
        {activeModalContent == 'icons' && <IconsManager />}
        {activeModalContent == 'payment' && <PaymentManager />}
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
  cursor: ${(prop) => (prop.$enabled ? 'pointer' : 'not-allowed')};
  color: ${(prop) => (prop.$enabled ? '#434343' : '	#D3D3D3')};
`;

const HexIcon = styled(HexSvg)`
  width: 32px;
  height: 32px;
  cursor: ${(prop) => (prop.$enabled ? 'pointer' : 'not-allowed')};
  color: ${(prop) => (prop.$enabled ? '#434343' : '	#D3D3D3')};
`;

const CartIcon = styled(CartSvg)`
  width: 32px;
  height: 32px;
  cursor: ${(prop) => (prop.$enabled ? 'pointer' : 'not-allowed')};
  color: ${(prop) => (prop.$enabled ? '#434343' : '	#D3D3D3')};
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
