import { useEffect, useState /* useContext */ } from 'react';
//import { AppContext } from '../Context';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Icon from '../components/Icon';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import IconsContainer from '../components/IconsContainer';
const API_URL = import.meta.env.VITE_API_URL;
import 'bootstrap/dist/css/bootstrap.min.css';
import Loader from '../components/Loader';
import Form from 'react-bootstrap/Form';

const IconsManager = () => {
  const [icons, setIcons] = useState([]);
  const [name, setName] = useState('');
  const [file, setFile] = useState(null);
  let [loading, setLoading] = useState(true);
  // const { setIsModalOpened } = useContext(AppContext);

  const [active, setActive] = useState(false);

  async function fetchIcons() {
    try {
      const response = await axios(`${API_URL}/api/icons`);
      let { data } = response.data;
      setIcons(data);
    } catch (error) {
      toast.error('Error fetching markers:', error);
    } finally {
      setLoading(e => !e);
    }
  }

  useEffect(() => {
    fetchIcons();
  }, []);

  async function handleDelete(e, id) {
    try {
      e.preventDefault();
      let response = await axios.delete(`${API_URL}/api/icons/${id}`);
      toast.success(response.data);
      fetchIcons(); // force rerender
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  const handleSubmit = async e => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append('icon', file);
      formData.append('name', name);

      // for (let [key, value] of formData.entries()) {
      //   console.log(`${key}:`, value);
      // }

      let response = await axios.post(`${API_URL}/api/icons`, formData);

      toast.success(response.data);
      fetchIcons();
      // setIsModalOpened(e => !e);
      // navigate('/icons');
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  function removeLastDotAndExtension(filename) {
    //FIX export out of component
    const lastDotIndex = filename.lastIndexOf('.');
    if (lastDotIndex !== -1) {
      return filename.substring(0, lastDotIndex);
    } else {
      return filename; // No dot found, return the original filename
    }
  }

  const handleFileChange = event => {
    const file = event.target.files[0]; // Get the first file
    if (file) {
      setName(removeLastDotAndExtension(file.name)); // Set the file name in state
      setFile(file);
    } else {
      setName(''); // Clear the file name if no file is selected
    }
  };

  return (
    <S.Container>
      <S.Form onSubmit={handleSubmit}>
        <Form.Control type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Icon Name" />

        <Form.Control type="file" accept="image/png" onChange={handleFileChange} required />

        <Button style={{ width: '100%' }} type="submit" variant="primary">
          Upload Iconasd
        </Button>
      </S.Form>

      <IconsContainer>
        <Loader loading={loading} style={{ margin: '0 auto' }} />

        {icons.map(img => (
          <Icon onClickHandler={() => setActive(img.name)} selected={img.name == active} key={img.id} {...img} handler={e => handleDelete(e, img.id)} />
        ))}
      </IconsContainer>
    </S.Container>
  );
};

export default IconsManager;

const S = {};
S.Container = styled.div`
  gap: 40px;
  display: grid;
  grid-template-columns: 3fr 3fr;
  grid-template-rows: auto;
`;

S.Form = styled.form`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
`;
