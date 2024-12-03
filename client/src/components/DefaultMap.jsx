import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';
const API_URL = import.meta.env.VITE_API_URL;
const MAP_PROVIDER = import.meta.env.VITE_MAP_PROVIDER;

// import MarkerClusterGroup from 'react-leaflet-markercluster';
// import 'react-leaflet-markercluster/dist/styles.min.css'; //

//INFO geogjson - lon, lat / leaflet - lat, lon

export default function DefaultMap({ center = [41.967, 43.855], data = [], editable, zoom = 7, children, forceRender, point }) {
  function customIcon(img) {
    return new Icon({
      iconUrl: img,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [-0, -18],
    });
  }

  let defaultIcon = new Icon({
    iconUrl: '/marker-icon.png',
    shadowUrl: '/marker-shadow.png',

    iconSize: [25, 41], // Default size of the icon [width, height]
    iconAnchor: [12, 41], // Point of the icon which will correspond to marker's location
    popupAnchor: [1, -34], // Point from which the popup should open relative to the iconAnchor

    // Size of the shadow
    shadowSize: [41, 41], // Default size of the shadow [width, height]
    shadowAnchor: [12, 41],
  });

  const handleDelete = async markerId => {
    //FIX error handling
    const formData = new FormData();
    formData.append('id', markerId);

    let response = await axios.delete(`${API_URL}/api/marker/${markerId}`, formData);
    forceRender();
    toast.success(response.data);
  };

  const attribution = '&copy; 2024 &middot; <a href="https://maps.omniscale.com/">Omniscale</a> ' + '&middot; Tsotneforester at GEOJS.ONE';

  return (
    <MapContainer zoomControl={false} scrollWheelZoom={true} center={center} zoom={zoom} style={{ height: '100%', width: '100%' }}>
      <TileLayer attribution={attribution} url={MAP_PROVIDER} />
      {/* <MarkerClusterGroup> */}

      {point && (
        <Marker position={point} icon={defaultIcon}>
          <Popup>You clicked here:</Popup>
        </Marker>
      )}

      {data.map(marker => {
        let { mimetype, _id, buffer, coords, name } = marker;
        return (
          <Marker key={_id} icon={customIcon(`data:${mimetype};base64,${buffer.toString('base64')}`)} position={coords}>
            <Popup>
              {name}
              {editable && (
                <S.DeleteAnchor>
                  <a href="#" onClick={() => handleDelete(_id)}>
                    Delete Marker
                  </a>
                </S.DeleteAnchor>
              )}
            </Popup>
          </Marker>
        );
      })}
      {/* </MarkerClusterGroup> */}
      {children}
    </MapContainer>
  );
}

const S = {};
S.DeleteAnchor = styled.div`
  border-top: 2px gray dotted; //FIX
  padding: 2px;
`;

//TODO performance issues
// i have react + node + mongo app of leaflet map, whin nearly 10000 markers on it, each marker icon has its document in "icons" table with image buffer. loading map is quite slow, what is pattern to display thousands of markers without mush delay?
//i have react + node + mongo app of leaflet map, i want to be able only add markers within predefined rectangle on map
