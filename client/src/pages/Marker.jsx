import styled from 'styled-components';
import { useMapEvents } from 'react-leaflet';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DefaultMap from '../components/DefaultMap';
const API_URL = import.meta.env.VITE_API_URL;
import Icon from '../components/Icon';
import { toast } from 'react-toastify';

//TODO single page this and Mymap

export default function Marker() {
  const [name, setName] = useState('');
  const [icons, setIcons] = useState([]);

  const [markerIconName, setMarkerIconName] = useState('');
  const [coords, setCoords] = useState({
    lat: '',
    lng: '',
  });

  const navigate = useNavigate(); // Step 2
  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append('name', name);
      formData.append('coords', Object.values(coords));
      formData.append('icon', markerIconName);

      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      let response = await axios.post(`${API_URL}/api/marker`, formData);
      toast.success(`${response.data.data.name} added`);
      navigate('/mymap');
    } catch (error) {
      toast.warning(`${error.response.data.message}`);
    }
  }

  async function fetchSelectIcons() {
    try {
      const response = await axios(`${API_URL}/api/icons`); // Adjust the URL as needed

      let { data } = response.data;
      //setIcons(response.data.data); // Assuming data is an array of marker objects with { lat, lng, id } structur

      setIcons(data);
    } catch (error) {
      console.error('Error fetching markers:', error);
    }
  }
  useEffect(() => {
    fetchSelectIcons();
  }, []);

  const handleChange = e => {
    setCoords({ ...coords, [e.target.name]: e.target.value });
  };

  function MapEventsHandler() {
    useMapEvents({
      click: e => {
        const { lat, lng } = e.latlng;

        setCoords({ lat, lng });
      },
    });
    return null;
  }

  return (
    <S.Container>
      <S.Form>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} placeholder="Icon Name" required />

          <input type="number" name="lat" value={coords.lat} onChange={handleChange} placeholder="lat" required />

          <input type="number" name="lng" value={coords.lng} onChange={handleChange} placeholder="lng" required />

          <S.Icons>
            {icons.map(icon => (
              <Icon canBeDeleted={false} onClickHandler={() => setMarkerIconName(icon.name)} selected={icon.name == markerIconName} key={icon.id} {...icon} />
            ))}
          </S.Icons>

          <button type="submit">create MArker</button>
        </form>
      </S.Form>
      <S.Map>
        <DefaultMap point={Object.values(coords)}>
          <MapEventsHandler />
        </DefaultMap>
      </S.Map>
    </S.Container>
  );
}

const S = {};
S.Container = styled.div`
  width: 400px;
  height: 400px;
  display: grid;

  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
`;

S.Form = styled.div`
  padding: 50px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
`;

S.Icons = styled.div`
  padding: 50px;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: flex-start;
`;

S.Map = styled.div`
  background-color: red;
`;
