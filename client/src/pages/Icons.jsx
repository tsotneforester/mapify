import { useState, useEffect } from 'react';
import axios from 'axios';
import Icon from '../components/Icon';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const API_URL = import.meta.env.VITE_API_URL;

const Icons = () => {
  const [icons, setIcons] = useState([]);
  const [name, setName] = useState('');
  const [file, setFile] = useState(null);

  const [active, setActive] = useState(false);
  const navigate = useNavigate();
  // const toast = useToast();

  // const handleDelete = async e => {
  //   e.preventDefault();

  //   await axios.post(`http://localhost:5000/api/icons/delete/${id}`);

  //   toast.warning('deleted');
  // };
  const fetchIcons = async () => {
    try {
      const response = await axios(`${API_URL}/api/icons`); // Adjust the URL as needed

      let { data } = response.data;
      //setIcons(response.data.data); // Assuming data is an array of marker objects with { lat, lng, id } structur
      //console.log(data);

      setIcons(data);
    } catch (error) {
      toast.error('Error fetching markers:', error);
    }
  };
  useEffect(() => {
    // Fetch marker data from your server

    fetchIcons();
  }, []);

  async function handleDelete(e, id) {
    try {
      e.preventDefault();
      let response = await axios.delete(`${API_URL}/api/icons/${id}`);
      toast.success(response.data);
      fetchIcons(); // force rerender
      //navigate('/icons');
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
      navigate('/icons');
    } catch (error) {
      toast.error(error.response.data);
    }

    // Handle success or error
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
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Icon Name" />
        <input type="file" accept="image/png" onChange={handleFileChange} required />
        <button type="submit">Upload Icon</button>
      </form>
      {icons.map(img => (
        <Icon onClickHandler={() => setActive(img.name)} selected={img.name == active} key={img.id} {...img} handler={e => handleDelete(e, img.id)} />
      ))}
    </S.Container>
  );
};

export default Icons;

const S = {};
S.Container = styled.div`
  padding: 50px;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: flex-start;
`;
