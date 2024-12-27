import styled from 'styled-components';
import axios from 'axios';
import { useState, useContext, useEffect } from 'react';
import { AppContext } from '../Context';

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import DefaultMap from '../components/DefaultMap';
import Modal from '../components/Modal';

const API_URL = import.meta.env.VITE_API_URL;
import { useForm } from 'react-hook-form';

const EditMarker = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [markers, setMarkers] = useState();
  const [setIcons] = useState([]);

  const [coords, setCoords] = useState({
    lat: '',
    lng: '',
  });
  let { id } = useParams();

  // const context = useContext(AppContext);

  const { isModalOpened, setIsModalOpened } = useContext(AppContext);

  async function fetchMarker() {
    try {
      const response = await axios(`${API_URL}/api/mymap/${id}`);
      let contactData = response.data.data;

      setMarkers(contactData);
      setValue('name', contactData.name);
      setValue('desc', contactData.desc);
      setValue('iconName', contactData.iconName);
      setCoords({ lat: contactData.coords[0], lng: contactData.coords[1] });

      // setValue('email', contactData.email);
    } catch (error) {
      console.error('Error fetching markers:', error);
    }
  }
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
    let { name, desc, iconName } = data;
    console.log(coords);
    try {
      const formData = new FormData();
      formData.append('markerName', name);
      formData.append('desc', desc);
      formData.append('coords', Object.values(coords));
      formData.append('iconID', iconName);

      if (!iconName) {
        alert('Please fill in the required input.');
        return; // Stop the submission if the input is empty
      }

      // for (let [key, value] of formData.entries()) {
      //   console.log(`${key}:`, value);
      // }

      // toast.success(`${response.data.data.name} added`);
      setIsModalOpened((e) => !e);
      // fetchMyMarkers();
      setCoords({
        lat: '',
        lng: '',
      });
    } catch (error) {
      console.log(error);
      // toast.error(`${error.response.data.error}`);
    } finally {
      navigate('/mymap');
    }
  }

  useEffect(() => {
    fetchMarker();
    fetchIcons();
    setIsModalOpened((e) => !e);
  }, []);

  return (
    <>
      <S.MapContainer>
        {markers && (
          <DefaultMap
            zoom={15}
            center={markers.coords}
            data={[markers]}
            editable={false}
          />
        )}
      </S.MapContainer>
      <Modal status={isModalOpened}>
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

            <Button
              style={{ width: '100%', gridArea: 'submit' }}
              type="submit"
              variant="primary"
            >
              Update Marker
            </Button>
            {/* <Dropdown
              data={icons}
              selectHandler={setSelectedIconID}
              selected={'67619c41e3943afb3c763c4c'}
            /> */}
          </S.Form>
          {/* <IconsContainer iconName={selectedIconID}>
        <Loader loading={loading} />
        {icons.map(icon => (
          <Icon canBeDeleted={false} onClickHandler={() => setSelectedIconID(icon.name)} selected={icon.name == selectedIconID} key={icon.id} {...icon} />
        ))}
      </IconsContainer> */}
        </S.Container>
      </Modal>
    </>
  );
};
export default EditMarker;

const S = {};
S.MapContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  width: 100vw;
  height: 100vh;
  height: 100svh;
`;

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
  gap: 10px;

  display: grid;
  grid-template-areas:
    'lable lable'
    'desc desc'
    'submit submit'
    'search search';
  grid-template-columns: auto;
  grid-template-rows: auto;
`;
