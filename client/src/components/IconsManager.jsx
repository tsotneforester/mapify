import { useEffect, useState /* useContext */ } from 'react';
//import { AppContext } from '../Context';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Icon from './Icon';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import IconsContainer from './IconsContainer';
const API_URL = import.meta.env.VITE_API_URL;
import 'bootstrap/dist/css/bootstrap.min.css';
import Loader from './Loader';
import Form from 'react-bootstrap/Form';

import HexSvg from '../assets/hex.svg?react';

const IconsManager = () => {
  const token = sessionStorage.getItem('token');
  const [icons, setIcons] = useState([]);
  const [name, setName] = useState('');
  const [file, setFile] = useState(null);
  let [loading, setLoading] = useState(true);
  let [info, setInfo] = useState(false);
  const [active, setActive] = useState(false);
  // const { setIsModalOpened } = useContext(AppContext);

  async function fetchIcons() {
    setLoading(true);
    try {
      const response = await axios(`${API_URL}/api/myicons`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the header
        },
      });
      let { data } = response.data;
      setIcons(data);
    } catch (error) {
      toast.error('Error fetching markers:', error);
    } finally {
      // setIcons([]);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchIcons();
  }, []);

  async function handleDelete(e, id) {
    const token = sessionStorage.getItem('token');
    try {
      e.preventDefault();
      let response = await axios.delete(`${API_URL}/api/icons/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(response.data);

      setActive('');
      fetchIcons();
      setIcons([]);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  const handleSubmit = async (e) => {
    const token = sessionStorage.getItem('token');
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append('icon', file);
      formData.append('name', name);

      // for (let [key, value] of formData.entries()) {
      //   console.log(`${key}:`, value);
      // }

      let response = await axios.post(`${API_URL}/api/icons`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(response.data);
      setName('');
      setFile(null);
      setInfo((e) => !e);

      setIcons([]);
      fetchIcons();
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the first file
    setFile(file);
  };

  return (
    <S.Container>
      {/* <InfoIcon /> */}

      <HexIcon
        onClick={() => {
          setInfo((e) => !e);
        }}
      />

      {/* <S.Form onSubmit={handleSubmit}>
        <Form.Control type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Icon Name" />

        <Form.Control type="file" accept="image/png" onChange={handleFileChange} required />

        <Button style={{ width: '100%' }} type="submit" variant="primary">
          Upload Icon
        </Button>
      </S.Form> */}

      {info && (
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

            <Button style={{ width: '100%' }} type="submit" variant="primary">
              Upload Icon
            </Button>
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
      {info || (
        <IconsContainer iconName={active}>
          <Loader loading={loading} style={{ margin: '0 auto' }} />

          {icons.map((img) => (
            <Icon
              onClickHandler={() => setActive(img.name)}
              selected={img.name == active}
              key={img.id}
              {...img}
              handler={(e) => handleDelete(e, img.id)}
            />
          ))}
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
  min-height: 194px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: flex-start;
`;

S.AddIcon = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
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
