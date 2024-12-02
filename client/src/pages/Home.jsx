import styled from 'styled-components';
import axios from 'axios';
import { useEffect, useState } from 'react';
import DefaultMap from '../components/DefaultMap';
const API_URL = import.meta.env.VITE_API_URL;

const Home = () => {
  const [markers, setMarkers] = useState([]);

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
    <S.Container>
      <DefaultMap zoom={8} data={markers} editable={false} />
    </S.Container>
  );
};
export default Home;

const S = {};
S.Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
`;
