import styled from 'styled-components';
import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { AppContext } from '../Context';
import DefaultMap from '../components/DefaultMap';
const API_URL = import.meta.env.VITE_API_URL;
import Icons from './Icons';

import Modal from '../components/Modal';

const Home = () => {
  const [markers, setMarkers] = useState([]);
  const context = useContext(AppContext);

  async function fetchMarkers() {
    try {
      const response = await axios(`${API_URL}/api/map`);
      console.log(response.data.data[0]['_id']);
      setMarkers(response.data.data); // Assuming data is an array of marker objects with { lat, lng, id } structure
      //toast.success(response.data.status);
    } catch (error) {
      console.error('Error fetching markers:', error);
    }
  }

  useEffect(() => {
    fetchMarkers();
  }, []);

  return (
    <>
      <S.Container>
        <DefaultMap zoom={8} data={markers} editable={false} />
      </S.Container>
    </>
  );
};
export default Home;

const S = {};
S.Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  width: 100vw;
  height: 100vh;
  height: 100svh;
`;
