import { useEffect, useState, useContext } from 'react';
import { AppContext } from '../Context';
import axios from 'axios';
import Icon from '../components/Icon';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import IconsContainer from '../components/IconsContainer';
const API_URL = import.meta.env.VITE_API_URL;

const MarkerManager = ({ fetchMyMarkers, coordinates }) => {
  let { coords, setCoords } = coordinates;

  let [loading, setLoading] = useState(true);
  const { setIsModalOpened } = useContext(AppContext);
  const [name, setName] = useState('');
  const [icons, setIcons] = useState([]);
  const [markerIconName, setMarkerIconName] = useState('');

  async function fetchMyIcons() {
    try {
      const response = await axios(`${API_URL}/api/icons`);
      let { data } = response.data;
      setIcons(data);
    } catch (error) {
      console.error('Error fetching markers:', error);
    } finally {
      setLoading(e => !e);
    }
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append('name', name);
      formData.append('coords', Object.values(coords));
      formData.append('icon', markerIconName);

      // for (let [key, value] of formData.entries()) {
      //   console.log(`${key}:`, value);
      // }

      let response = await axios.post(`${API_URL}/api/marker`, formData);
      toast.success(`${response.data.data.name} added`);
    } catch (error) {
      toast.warning(`${error.response.data.message}`);
    } finally {
      setIsModalOpened(e => !e);
      fetchMyMarkers();
      setCoords({
        lat: '',
        lng: '',
      });
    }
  }

  useEffect(() => {
    fetchMyIcons();
  }, []);

  return (
    <>
      <S.Form onSubmit={handleSubmit}>
        <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} placeholder="Icon Name" required />

        <input type="number" name="lat" value={coords.lat} placeholder="lat" required disabled />

        <input type="number" name="lng" value={coords.lng} placeholder="lng" required disabled />

        <button type="submit">create MArker</button>
      </S.Form>
      <IconsContainer loading={loading}>
        {icons.map(icon => (
          <Icon canBeDeleted={false} onClickHandler={() => setMarkerIconName(icon.name)} selected={icon.name == markerIconName} key={icon.id} {...icon} />
        ))}
      </IconsContainer>
    </>
  );
};

export default MarkerManager;

const S = {};
S.Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  gap: 40px;
`;

S.Form = styled.form`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
`;
