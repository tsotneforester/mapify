import React from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Circle, Popup } from 'react-leaflet';
import { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import 'leaflet/dist/leaflet.css';
import styled from 'styled-components';
const API_URL = import.meta.env.VITE_API_URL;

const MyMap = () => {
  // Define the center of the map and the circle's properties
  const position = [41.505, 42.09]; // Latitude and Longitude
  const radius = 2; // Radius in meters
  const [markers, setMarkers] = useState([]);
  async function fetchMyMarkers() {
    const token = sessionStorage.getItem('token');
    try {
      const response = await axios(`${API_URL}/api/holy`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the header
        },
      });
      setMarkers(response.data.data);
    } catch (error) {
      console.error('Error fetching markers:', error);
    }
  }
  useEffect(() => {
    fetchMyMarkers();
  }, []);

  return (
    <S.Map>
      <MapContainer
        center={position}
        zoom={11}
        zoomControl={false}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {markers.map((marker) => {
          let { _id, coordinates, name, description } = marker;

          return (
            <Circle
              key={_id}
              center={[coordinates[1], coordinates[0]]}
              radius={radius}
              pathOptions={{
                color: 'blue',
                fillColor: 'lightblue',
                fillOpacity: 0.5,
              }}
            >
              <Popup>
                {name}
                {description}
              </Popup>
            </Circle>
          );
        })}
      </MapContainer>
    </S.Map>
  );
};

export default MyMap;

const S = {};
S.Map = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  height: 100svh;
  z-index: 0;
`;
