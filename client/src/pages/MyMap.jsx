import styled from 'styled-components';
import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { AppContext } from '../Context';
import DefaultMap from '../components/DefaultMap';
const API_URL = import.meta.env.VITE_API_URL;
import { useMapEvents } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import Icon from '../components/Icon';
import { toast } from 'react-toastify';
import AddMarkerSvg from '../assets/addmarker.svg?react';
import Modal from '../components/Modal';

export default function MyMap() {
  const [markers, setMarkers] = useState([]);
  const [coords, setCoords] = useState({
    lat: '',
    lng: '',
  });
  const { isModalOpened, setIsModalOpened } = useContext(AppContext);
  const [name, setName] = useState('');
  const [icons, setIcons] = useState([]);

  const [markerIconName, setMarkerIconName] = useState('');

  const navigate = useNavigate(); // Step 2

  async function fetchMyMarkers() {
    try {
      const response = await axios(`${API_URL}/api/mymap`);
      setMarkers(response.data.data);
      //toast.success(response.data.status);
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

  function isObjectValuesNotEmpty(obj) {
    // Check if the input is an object
    if (typeof obj !== 'object' || obj === null) {
      return false; // Not an object or is null
    }

    // Iterate through the object's values
    for (const value of Object.values(obj)) {
      // Check if the value is empty
      if (value === null || value === undefined || (typeof value === 'string' && value.trim() === '') || (Array.isArray(value) && value.length === 0) || (typeof value === 'object' && Object.keys(value).length === 0)) {
        return false; // Found an empty value
      }
    }

    return true; // All values are not empty
  }

  useEffect(() => {
    fetchMyMarkers();
  }, []);

  const handleChange = e => {
    setCoords({ ...coords, [e.target.name]: e.target.value });
  };
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
      fetchMyMarkers();
    } catch (error) {
      toast.warning(`${error.response.data.message}`);
    } finally {
      setIsModalOpened(e => !e);
      setCoords({
        lat: '',
        lng: '',
      });
    }
  }

  return (
    <>
      <S.Container>
        <DefaultMap zoom={8} data={markers} editable={true} forceRender={() => fetchMyMarkers()} point={Object.values(coords)}>
          <MapEventsHandler />
        </DefaultMap>
      </S.Container>

      {isObjectValuesNotEmpty(coords) && (
        <AddMarkerIcon
          onClick={() => {
            setIsModalOpened(e => !e);
            fetchSelectIcons();
          }}
        />
      )}

      <Modal status={isModalOpened}>
        {/* <Icons /> */}
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
