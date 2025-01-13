import { useEffect, useState, useContext } from 'react';
import { AppContext } from '../Context';
import api from '../axiosInterseptor';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import PulseLoader from 'react-spinners/PulseLoader';
import SubmitButton from '../components/SubmitButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Dropdown from './Dropdown';
import { useNavigate } from 'react-router-dom';

const MarkerManager = ({ fetchMyMarkers, coordinates, redirect }) => {
  const navigate = useNavigate();
  let { coords, setCoords } = coordinates;
  let [loadingButton, setLoadingButton] = useState(false);
  let [loading, setLoading] = useState(true);
  const { setIsModalOpened } = useContext(AppContext);
  const [balance, setBalance] = useState('');
  const [selectedIconID, setSelectedIconID] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function fetchBalance() {
    try {
      const response = await api(`/api/balance`);
      let { data } = response.data;
      setBalance(data);
    } catch (error) {
      toast.error(`${error.response.data.message}`);
    } finally {
      setLoading((e) => !e);
    }
  }

  async function handleMarkerSubmit(data) {
    let { name, desc } = data;
    setLoadingButton(true);
    try {
      if (!selectedIconID) {
        setSelectedIconID(null);
        return; // Stop the submission if the input is empty
      }

      let response = await api.post(`/api/markers`, {
        markerName: name,
        desc,
        coords: Object.values(coords).reverse(),
        iconID: selectedIconID,
      });
      toast.success(`${response.data.data.name} added`);
      setIsModalOpened((e) => !e);
      fetchMyMarkers();
      setCoords({
        lng: '',
        lat: '',
      });
    } catch (error) {
      toast.error(`${error.response.data.message}`);
    } finally {
      setLoadingButton(false);
      if (redirect) {
        navigate(redirect);
      }
    }
  }

  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <S.Container>
      <S.Form noValidate onSubmit={handleSubmit(handleMarkerSubmit)}>
        <fieldset style={{ gridArea: 'lable' }}>
          <Form.Control
            type="text"
            isInvalid={errors.name}
            placeholder="Marker label"
            {...register('name', {
              required: '* Marker name is required',
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

        <SubmitButton
          label="Create Marker"
          loading={loadingButton}
          style={{ width: '100%', gridArea: 'submit' }}
        />

        <Dropdown selectHandler={setSelectedIconID} selected={selectedIconID} />

        <S.Balance>
          <p>მონიშვნების ბალანსი შეადგენს</p>

          {loading ? (
            <PulseLoader margin={2} size={5} loading={loading} />
          ) : (
            <p>{balance}</p>
          )}
        </S.Balance>
      </S.Form>
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
    'search search'
    'balance balance';
  grid-template-columns: auto;
  grid-template-rows: auto;
`;
S.Balance = styled.div`
  grid-area: balance;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  gap: 10px;

  p:first-child {
    font-family: 'Noto Sans Georgian', serif;
    font-weight: 100;
    font-size: 14px;
    color: #0e43b5;
    font-weight: 400;
    text-align: center;
    font-style: italic;
  }

  p:last-child {
    font-family: 'Noto Sans Georgian', serif;
    font-weight: 700;
  }
`;
