import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import ContentLoader from 'react-content-loader';
import api from '../axiosInterseptor';
import 'react-loading-skeleton/dist/skeleton.css';
import mapbg from '../assets/mappattern.png';
import CameraSVG from '../assets/camera.svg?react';
import { toast } from 'react-toastify';
import { Form, Button } from 'react-bootstrap';
import CamoContainer from '../components/CamoContainer';
import CloseSVG from '../assets/close.svg?react';
import CloseButton from '../components/CloseButton';
import ConfirmationModal from '../components/ConfirmationModal';

const User = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const hiddenFileInput = useRef(null);
  const [file, setFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  async function fetchUser() {
    try {
      let response = await api(`/api/user`);
      // console.log('fetchuser', response.data.data);
      setUserData(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (file) {
      updateUser();
    }
  }, [file]);

  async function updateUser() {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('avatar', file);

      // for (const [key, value] of formData.entries()) {
      //   console.log(`${key}: ${value}`);
      // }

      let response = await api.patch(`/api/user`, formData);
      sessionStorage.setItem('user', response.data.data.name);
      sessionStorage.setItem('avatar', response.data.data.avatar);
      fetchUser();
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  async function deleteUser() {
    setLoading(true);
    setIsModalOpen(false);
    try {
      await api.delete(`/api/user`);
      navigate('/login');
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  const handleClick = () => {
    hiddenFileInput.current.click(); // Trigger the hidden file input
  };

  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    setFile(fileUploaded);
  };

  let { avatar, name, email, balance, markers, icons } = userData;
  return (
    <CamoContainer>
      <CloseButton color="#ffffff8a" route="/" />

      <S.UpperSection>
        {loading ? (
          <AvatarLoader />
        ) : (
          <S.Avatar>
            <ProfileImage src={avatar} alt={name} />

            <S.EditAvatar onClick={handleClick}>
              <S.CameraIcon />

              <input
                type="file"
                name="avatar"
                ref={hiddenFileInput}
                onChange={handleChange}
                style={{ display: 'none' }} // Hide the default file input
              />
              <p>Edit</p>
            </S.EditAvatar>

            <Name>{name}</Name>
          </S.Avatar>
        )}
      </S.UpperSection>
      <S.LowerSection>
        <InfoSection>
          <InfoText>
            {<strong>Email:</strong>}
            {loading ? <EmailLoader /> : <span>{email}</span>}
          </InfoText>
          <InfoText>
            <strong>Balance:</strong>
            {loading ? (
              <NumberLoader />
            ) : (
              <span>
                {markers.length} / {balance + markers.length}
              </span>
            )}
          </InfoText>

          <InfoText>
            <strong>Icons:</strong>
            {loading ? <NumberLoader /> : <span>{icons.length}</span>}
          </InfoText>
        </InfoSection>
        <Button
          style={{ gridArea: 'delete' }}
          onClick={() => setIsModalOpen(true)}
          variant="danger"
        >
          Delete user
        </Button>
        <Button
          style={{ gridArea: 'change' }}
          onClick={() => navigate('/user/change-password')}
          variant="warning"
        >
          Change password
        </Button>
      </S.LowerSection>
      {isModalOpen && (
        <ConfirmationModal
          onClose={() => setIsModalOpen(false)}
          onConfirm={deleteUser}
        >
          <h2
            style={{ fontSize: '22px', textAlign: 'center', fontWeight: '600' }}
          >
            Are you sure?
          </h2>
          <p>
            You are about to delete your account. Please be aware that this
            action is irreversible, and all your data will be permanently wiped
            from our system.
          </p>
        </ConfirmationModal>
      )}
    </CamoContainer>
  );
};

export default User;

const EmailLoader = (props) => (
  <ContentLoader
    speed={1}
    width={160}
    height={24}
    backgroundColor="#cdc6c6"
    foregroundColor="#9d9b9b"
    {...props}
  >
    <rect x="0" y="0" rx="7" ry="7" width="160" height="24" />
  </ContentLoader>
);
const NumberLoader = (props) => (
  <ContentLoader
    speed={1}
    width={30}
    height={24}
    backgroundColor="#cdc6c6"
    foregroundColor="#9d9b9b"
    {...props}
  >
    <rect x="0" y="0" rx="7" ry="7" width="30" height="24" />
  </ContentLoader>
);
const AvatarLoader = (props) => (
  <ContentLoader
    speed={1}
    width={148}
    height={200}
    backgroundColor="#cdc6c6"
    foregroundColor="#9d9b9b"
    {...props}
  >
    <circle cx="74" cy="74" r="74" />
    <rect x="0" y="160" rx="7" ry="7" width="148" height="34" />
  </ContentLoader>
);

const S = {};

S.UpperSection = styled.div`
  background: linear-gradient(135deg, #5178b7, #3db993);
  color: #fff;
  padding: 20px;
  text-align: center;
  flex: 1;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
`;

S.Avatar = styled.div`
  position: relative;
`;

S.EditAvatar = styled.div`
  position: absolute;
  top: -8px;
  right: -36px;
  background-color: #ffffff;
  height: auto;
  border-radius: 7px;
  border: 1px gray solid;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  padding: 3px 6px;

  p {
    color: gray;
  }
`;

S.CameraIcon = styled(CameraSVG)`
  color: #808080;
  width: 25px;
`;

const ProfileImage = styled.img`
  border-radius: 50%;
  width: 148px;
  height: 148px;
`;

const Name = styled.h2`
  font-size: 1.5em;
  margin: 10px 0 5px;
`;

S.LowerSection = styled.div`
  padding: 20px;
  display: grid;
  grid-template-areas:
    'info  info'
    'delete  change';
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  gap: 20px;
`;

const InfoSection = styled.div`
  margin-bottom: 20px;
  grid-area: info;
`;

const InfoText = styled.p`
  margin: 5px 0;
  color: #333;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
`;
