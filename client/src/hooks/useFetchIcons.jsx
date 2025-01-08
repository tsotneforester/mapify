import { useState, useEffect } from 'react';
import api from '../axiosInterseptor';

const useFetchIcons = (endpoint) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api(`/${endpoint}`);

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
