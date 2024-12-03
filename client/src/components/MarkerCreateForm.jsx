import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

const MarkerCreateForm = () => {
  const [name, setName] = useState('name');
  const [icons, setIcons] = useState([]);
  const [markerIconName, setMarkerIconName] = useState('');
  const [coords, setCoords] = useState({
    lat: '',
    lng: '',
  });

  const navigate = useNavigate(); // Step 2

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('coords', Object.values(coords));
    formData.append('icon', markerIconName);

    // for (let [key, value] of formData.entries()) {
    //   console.log(`${key}:`, value);
    // }

    await axios.post(`${API_URL}/api/markers`, formData);
    navigate('/mymap');
    // Handle success or error
  };

  useEffect(() => {
    // Fetch marker data from your server
    const fetchIcons = async () => {
      try {
        const response = await axios(`${API_URL}/api/icons`); // Adjust the URL as needed

        let { data } = response.data;
        //setIcons(response.data.data); // Assuming data is an array of marker objects with { lat, lng, id } structur

        setIcons(data);
      } catch (error) {
        console.error('Error fetching markers:', error);
      }
    };

    fetchIcons();
  }, []);

  const handleChange = e => {
    setCoords({ ...coords, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} placeholder="Icon Name" required />

      <input type="number" name="lat" value={coords.lat} onChange={handleChange} placeholder="lat" required />

      <input type="number" name="lng" value={coords.lng} onChange={handleChange} placeholder="lng" required />

      <select
        name="icon"
        value={markerIconName}
        onChange={event => {
          setMarkerIconName(event.target.value); // Update state with the selected value
        }}
      >
        {icons.map((icon, i) => (
          <option key={i} value={icon.name}>
            {/* TODO show icon in select list with REACT SELECT */}
            {/*  <img src={`data:${icon.mimetype};base64,${icon.data}`} /> */} {icon.name}
          </option>
        ))}
      </select>

      <button type="submit">create MArker</button>
    </form>
  );
};

export default MarkerCreateForm;
