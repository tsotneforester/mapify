import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';
const API_URL = import.meta.env.VITE_API_URL;

const MAP_PROVIDER = import.meta.env.VITE_MAP_PROVIDER;
import { Link, useNavigate } from 'react-router-dom';
import CloseSVG from '../assets/bin.svg?react';
import EditSVG from '../assets/edit.svg?react';

//INFO geogjson - lon, lat / leaflet - lat, lon

export default function DefaultMap({
  center = [41.967, 43.855],
  data = [],
  editable,
  zoom = 7,
  children,
  forceRender,
  point,
}) {
  function customIcon(img) {
    return new Icon({
      iconUrl: `${img}`,
      iconSize: [44, 44],
      iconAnchor: [22, 22],
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

  const navigate = useNavigate();
  const token = sessionStorage.getItem('token');

  const handleEdit = async (markerId) => {
    try {
      navigate(`/edit/${markerId}`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (markerId) => {
    try {
      let response = await axios.delete(`${API_URL}/api/marker/${markerId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      forceRender();
      toast.success('Marker Deleted');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const attribution =
    '&copy; 2024 &middot; <a href="https://geojs.one">GEOJS.ONE</a>';

  return (
    <MapContainer
      zoomControl={false}
      scrollWheelZoom={true}
      center={center}
      zoom={zoom}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer attribution={attribution} url={MAP_PROVIDER} />

      {point && (
        <Marker position={point} icon={defaultIcon}>
          <Popup>You clicked here:</Popup>
        </Marker>
      )}

      {data.map((marker) => {
        let { _id, imageName, coords, name } = marker;
        return (
          <Marker key={_id} icon={customIcon(imageName)} position={coords}>
            <Popup>
              <div style={popupContent}>
                <p style={{ fontSize: '22px' }}> {name}</p>

                {editable && (
                  <>
                    <S.DeleteAnchor>
                      <a href="#" onClick={() => handleDelete(_id)}>
                        <CloseIcon />
                      </a>

                      <EditIcon />

                      {/* <a href="#" onClick={() => handleEdit(_id)}>
                        <EditIcon />
                      </a> */}
                    </S.DeleteAnchor>
                  </>
                )}
              </div>
            </Popup>
          </Marker>
        );
      })}

      {children}
    </MapContainer>
  );
}

const S = {};
S.DeleteAnchor = styled.div`
  padding: 2px;
  width: 100%;
  border-top: dotted gray 1px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
`;
const CloseIcon = styled(CloseSVG)`
  //width: 25px;
  color: #ff0000;
`;
const EditIcon = styled(EditSVG)`
  //width: 25px;
  color: #f2bb1889;
  /* cursor: not-allowed;
  pointer-events: none; */
`;

const popupContent = {
  textAlign: 'center',
  minWidth: '150px',
};
