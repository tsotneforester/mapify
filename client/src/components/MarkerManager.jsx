import { useEffect, useState, useContext } from 'react';
import { AppContext } from '../Context';
import axios from 'axios';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';

const API_URL = import.meta.env.VITE_API_URL;

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Dropdown from './Dropdown';

const MarkerManager = ({ fetchMyMarkers, coordinates }) => {
  const token = sessionStorage.getItem('token');

  let { coords, setCoords } = coordinates;
  const [nameInput, setNameInput] = useState('');

  let [Loading, setLoading] = useState(true);
  const { setIsModalOpened } = useContext(AppContext);
  const [icons, setIcons] = useState([]);
  const [selectedIconID, setSelectedIconID] = useState('');

  async function fetchIcons() {
    const token = sessionStorage.getItem('token');
    try {
      const response = await axios(`${API_URL}/api/icons`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the header
        },
      });
      let { data } = response.data;
      setIcons(data);
    } catch (error) {
      console.error('Error fetching markers:', error);
    } finally {
      setLoading((e) => !e);
    }
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append('markerName', nameInput);
      formData.append('coords', Object.values(coords));
      formData.append('iconID', selectedIconID);

      console.log("i'm sending formdata");
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      let response = await axios.post(`${API_URL}/api/marker`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(`${response.data.data.name} added`);
    } catch (error) {
      console.log(error);
      toast.error(`${error.response.data.error}`);
    } finally {
      setIsModalOpened((e) => !e);
      fetchMyMarkers();
      setCoords({
        lat: '',
        lng: '',
      });
    }
  }

  useEffect(() => {
    fetchIcons();
  }, []);

  return (
    <S.Container>
      <S.Form onSubmit={handleSubmit}>
        <Form.Control
          type="text"
          name="name"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          placeholder="Marker label"
          required
        />

        <Form.Control
          type="number"
          name="lat"
          value={coords.lat}
          placeholder="lat"
          required
          disabled
        />

        <Form.Control
          type="number"
          name="lng"
          value={coords.lng}
          placeholder="lng"
          required
          disabled
        />

        <Button style={{ width: '100%' }} type="submit" variant="primary">
          Create Marker
        </Button>
        <Dropdown data={icons} selectHandler={setSelectedIconID} />
      </S.Form>
      {/* <IconsContainer iconName={selectedIconID}>
        <Loader loading={loading} />
        {icons.map(icon => (
          <Icon canBeDeleted={false} onClickHandler={() => setSelectedIconID(icon.name)} selected={icon.name == selectedIconID} key={icon.id} {...icon} />
        ))}
      </IconsContainer> */}
    </S.Container>
  );
};

export default MarkerManager;

const S = {};
S.Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  gap: 10px;
  position: relative;
  max-width: 400px;
  margin: 0 auto;
`;

S.Form = styled.form`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
`;
