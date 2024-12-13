import styled from 'styled-components';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
//import { AppContext } from '../Context';
import DefaultMap from '../components/DefaultMap';
const API_URL = import.meta.env.VITE_API_URL;

const EditMarker = () => {
  const [markers, setMarkers] = useState();
  let { id } = useParams();
  // const context = useContext(AppContext);

  async function fetchMarker() {
    try {
      const response = await axios(`${API_URL}/api/mymap/${id}`);

      setMarkers(response.data.data); // Assuming data is an array of marker objects with { lat, lng, id } structure
      //toast.success(response.data.status);
    } catch (error) {
      console.error('Error fetching markers:', error);
    }
  }

  useEffect(() => {
    fetchMarker();
  }, []);

  return (
    <S.Container>
      {markers && (
        <DefaultMap
          zoom={15}
          center={markers.coords}
          data={[markers]}
          editable={false}
        />
      )}
    </S.Container>
  );
};
export default EditMarker;

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
