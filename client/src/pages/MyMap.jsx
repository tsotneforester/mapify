import styled from 'styled-components';
import axios from 'axios';
import { useEffect, useState } from 'react';
import DefaultMap from '../components/DefaultMap';
const API_URL = import.meta.env.VITE_API_URL;

export default function MyMap() {
  const [markers, setMarkers] = useState([]);

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
    <S.Container>
      <DefaultMap zoom={8} data={markers} editable={true} forceRender={() => fetchMyMarkers()} />
    </S.Container>
  );
}

const S = {};
S.Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
`;
