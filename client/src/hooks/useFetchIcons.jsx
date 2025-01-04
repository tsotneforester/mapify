import { useState, useEffect } from 'react';
const API_URL = import.meta.env.VITE_API_URL;
import axios from 'axios';

const useFetchIcons = (endpoint) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios(`${API_URL}/${endpoint}`, {
          withCredentials: true,
        });

        let { data: icons } = response.data;

        setData(icons);
      } catch (err) {
        console.error('Error fetching markers:', err);
      } finally {
        setLoading((e) => !e);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading };
};

export default useFetchIcons;
