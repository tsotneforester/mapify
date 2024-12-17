import { useEffect, useState, useContext } from 'react';
import { AppContext } from '../Context';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';

const API_URL = import.meta.env.VITE_API_URL;

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Dropdown from './Dropdown';
import { useNavigate } from 'react-router-dom';

const MarkerManager = ({ fetchMyMarkers, coordinates, redirect }) => {
  const token = sessionStorage.getItem('token');
  const navigate = useNavigate();
  let { coords, setCoords } = coordinates;
  const [nameInput, setNameInput] = useState('');

  let [Loading, setLoading] = useState(true);
  const { setIsModalOpened } = useContext(AppContext);
  const [icons, setIcons] = useState([]);
  const [selectedIconID, setSelectedIconID] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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

  async function handleMarkerSubmit(data) {
    let { name, desc } = data;
    try {
      const formData = new FormData();
      formData.append('markerName', name);
      formData.append('desc', desc);
      formData.append('coords', Object.values(coords));
      formData.append('iconID', selectedIconID);

      if (!selectedIconID) {
        alert('Please fill in the required input.');
        return; // Stop the submission if the input is empty
      }

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
      setIsModalOpened((e) => !e);
      fetchMyMarkers();
      setCoords({
        lat: '',
        lng: '',
      });
    } catch (error) {
      console.log(error);
      toast.error(`${error.response.data.error}`);
    } finally {
      if (redirect) {
        navigate(redirect);
      }
    }
  }

  useEffect(() => {
    fetchIcons();
  }, []);

  return (
    <S.Container>
      <S.Form noValidate onSubmit={handleSubmit(handleMarkerSubmit)}>
        <fieldset style={{ gridArea: 'lable' }}>
          <Form.Control
            type="text"
            isInvalid={errors.name}
            // value={nameInput}
            // onChange={(e) => setNameInput(e.target.value)}
            placeholder="Marker label"
            {...register('name', {
              required: 'Marker name is required',
            })}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name?.message}
          </Form.Control.Feedback>
        </fieldset>

        <fieldset style={{ gridArea: 'desc' }}>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="description"
            {...register('desc')}
          />
        </fieldset>

        <fieldset style={{ gridArea: 'lat' }}>
          <Form.Label>Latitude</Form.Label>
          <Form.Control
            type="number"
            name="lat"
            value={coords.lat}
            placeholder="lat"
            required
            disabled
          />
        </fieldset>

        <fieldset style={{ gridArea: 'lng' }}>
          <Form.Label>Longitude</Form.Label>
          <Form.Control
            type="number"
            name="lng"
            value={coords.lng}
            placeholder="lng"
            required
            disabled
          />
        </fieldset>

        <Button
          style={{ width: '100%', gridArea: 'submit' }}
          type="submit"
          variant="primary"
        >
          Create Marker
        </Button>
        <Dropdown data={icons} selectHandler={setSelectedIconID} />
        <Form.Control.Feedback type="invalid">
          {errors.name?.message}
        </Form.Control.Feedback>
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
  /* display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;*/
  gap: 10px;

  display: grid;
  grid-template-areas:
    'lable lable'
    'desc desc'
    'lat lng'
    'submit submit'
    'search search';
  grid-template-columns: auto;
  grid-template-rows: auto;
`;
