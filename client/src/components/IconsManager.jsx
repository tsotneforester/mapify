import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Icon from './Icon';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import IconsContainer from './IconsContainer';
const API_URL = import.meta.env.VITE_API_URL;
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import HexSvg from '../assets/hexadd.svg?react';
import ReturnSvg from '../assets/return.svg?react';
import NoContent from './NoContent';
import Spinner from 'react-bootstrap/Spinner';
import SubmitButton from '../components/SubmitButton';

const IconsManager = () => {
  const token = sessionStorage.getItem('token');
  const [data, setData] = useState([]);

  let [loading, setLoading] = useState(true);
  let [loadingButton, setLoadingButton] = useState(false);
  let [showForm, setShowForm] = useState(false);
  const [activeIconName, setActiveIconName] = useState(false);
  //form
  const [name, setName] = useState('');
  const [file, setFile] = useState(null);

  async function fetchMyIcons() {
    // setLoading(true);
    try {
      const response = await axios(`${API_URL}/api/myicons`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the header
        },
      });
      let { data: result } = response.data;
      setData(result);
    } catch (error) {
      toast.error('Error fetching markers:', error);
    } finally {
      setLoading(false);
    }
  }
  fetchMyIcons();

  async function handleDelete(e, id) {
    const token = sessionStorage.getItem('token');
    try {
      e.preventDefault();
      let response = await axios.delete(`${API_URL}/api/icons/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Icon deleted');

      setActiveIconName('');
      setLoading(true);
      fetchMyIcons();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  const handleSubmit = async (e) => {
    const token = sessionStorage.getItem('token');
    setLoadingButton(true);
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append('icon', file);
      formData.append('name', name);

      let response = await axios.post(`${API_URL}/api/icons`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(response.data);

      setShowForm((e) => !e);
      setLoading(true);
      fetchMyIcons();
    } catch (error) {
      toast.error(error.response.data);
    } finally {
      setName('');
      setFile(null);
      setLoadingButton(false);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  return (
    <S.Container>
      {showForm ? (
        <ReturnIcon
          onClick={() => {
            setShowForm((e) => !e);
          }}
        />
      ) : (
        <HexIcon
          onClick={() => {
            setShowForm((e) => !e);
          }}
        />
      )}

      {showForm && (
        <S.AddIcon>
          <S.Form onSubmit={handleSubmit}>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Icon Name"
            />

            <Form.Control
              type="file"
              name="icon"
              accept="image/png"
              onChange={handleFileChange}
              required
            />

            <SubmitButton label="Upload Icon" loading={loadingButton} />
          </S.Form>
          <p>
            ჩამოტვირთე სტანდარტული
            <a href="/default.zip" download>
              &nbsp; ხატულა
            </a>
            , შეცვალე მისი ფერი და ლოგო მის შიგნით შენი სურვილისამებრ.
            არასტანდარტული ხატულები წაიშლება სერვერიდან
          </p>
        </S.AddIcon>
      )}
      {showForm || (
        <IconsContainer iconName={activeIconName} loading={loading}>
          {data.length === 0 ? (
            <NoContent />
          ) : (
            data.map((img) => (
              <Icon
                onClickHandler={() => setActiveIconName(img.name)}
                selected={img.name == activeIconName}
                key={img.id}
                {...img}
                handler={(e) => handleDelete(e, img.id)}
              />
            ))
          )}
        </IconsContainer>
      )}
    </S.Container>
  );
};

export default IconsManager;

const S = {};
S.Container = styled.div`
  gap: 40px;
  /* display: grid;
    grid-template-columns: 2fr 3fr;
    grid-template-rows: auto; */
  position: relative;
  //min-height: 240px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: flex-start;
`;

S.AddIcon = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;

  align-items: center;
  gap: 12px;

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 100%;
    gap: 20px;
  }

  p {
    font-size: 14px;
    color: #042914;
    font-weight: 400;
    text-align: center;
    font-style: italic;
  }
`;

S.Form = styled.form`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
`;

S.LoaderContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
`;

const HexIcon = styled(HexSvg)`
  width: 25px;
  position: absolute;
  right: -25px;
  top: -24px;
  color: white;
`;

const ReturnIcon = styled(ReturnSvg)`
  width: 30px;
  position: absolute;
  right: -24px;
  top: -35px;
  color: white;
`;
