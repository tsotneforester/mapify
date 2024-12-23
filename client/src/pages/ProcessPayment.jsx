import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;
import SharedAuth from '../components/SharedAuth';
import { toast } from 'react-toastify';

import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Link,
  useNavigate,
  Navigate,
  useSearchParams,
  useLocation, //TODO to snippets
} from 'react-router-dom';

const ProcessPayment = () => {
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const query = useQuery();
  const token = query.get('token');

  const navigate = useNavigate();

  async function verifyToken() {
    try {
      const response = await axios(`${API_URL}/api/mymap`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the header
        },
      });

      navigate('/'); // Redirect to protected route

      toast.success(`user verified`);

      // Redirect to protected route
    } catch (error) {
      toast.error(`${error.response.data.message}`);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      verifyToken();
    }, 2000);
  }, []);

  return (
    <SharedAuth>
      <h1>Redirecting To user map</h1>
    </SharedAuth>
  );
};

export default ProcessPayment;
