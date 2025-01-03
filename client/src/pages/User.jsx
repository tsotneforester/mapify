import styled from 'styled-components';
import axios from 'axios';
import { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import ContentLoader from 'react-content-loader';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import mapbg from '../assets/mappattern.png';

const User = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});

  async function fetchUserInfo() {
    const token = sessionStorage.getItem('token');
    try {
      setTimeout(() => {
        setUserData({ name: 'tsotne', email: 'sada@fsdf', balance: '10/20' });
        setLoading((e) => !e);
      }, 2000);
    } catch (error) {}
  }
  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <S.Container>
      <ProfileCard>
        <LeftSection>
          <ProfileImage
            src="https://via.placeholder.com/80"
            alt="Profile Picture"
          />
          <Name>{userData.name || <Skeleton />}</Name>
        </LeftSection>

        <RightSection>
          {loading ? (
            <MyLoader />
          ) : (
            <InfoSection>
              <InfoText>
                {<strong>Email: {userData.email}</strong> || <Skeleton />}
              </InfoText>
              <InfoText>
                <strong>Phone:</strong> 98979989898
              </InfoText>
              <InfoText>
                <strong>Marker Balance:</strong>
                {userData.balance}
              </InfoText>
            </InfoSection>
          )}
        </RightSection>
      </ProfileCard>
    </S.Container>
  );
};

export default User;

const S = {};
S.Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  background-color: #abc5ab;
  min-height: 100vh;
  min-height: 100svh;
  padding: 10px;
  background-image: url(${mapbg});
  background-repeat: repeat; //repeat-y/repeat-x/no-repeat/space/round
  background-position: 0% 0%; // center/bottom/left/right/(%, px)
  background-attachment: scroll; //fixed / local
  background-size: auto; //length/cover/contain
`;

const ProfileCard = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;

  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  max-width: 450px;
  width: 100%;
`;

const LeftSection = styled.div`
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

const ProfileImage = styled.img`
  border-radius: 50%;
  width: 80px;
  height: 80px;
  margin-bottom: 10px;
`;

const Name = styled.h2`
  font-size: 1.5em;
  margin: 10px 0 5px;
`;

const JobTitle = styled.p`
  font-size: 1em;
  margin: 0;
`;

const RightSection = styled.div`
  flex: 2;
  padding: 20px;
`;

const InfoSection = styled.div`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h3`
  margin-bottom: 10px;
  font-size: 1em;
  color: #555;
`;

const InfoText = styled.p`
  margin: 5px 0;
  color: #333;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 10px;
`;

const SocialLink = styled.a`
  color: #555;
  text-decoration: none;
  font-size: 1.2em;
  transition: color 0.3s;

  &:hover {
    color: #ff758c;
  }
`;

const MyLoader = (props) => (
  <ContentLoader
    speed={2}
    width={410}
    height={102}
    viewBox="0 0 410 102"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="2" y="7" rx="0" ry="0" width="200" height="21" />
    <rect x="3" y="42" rx="0" ry="0" width="200" height="21" />
    <rect x="2" y="79" rx="0" ry="0" width="200" height="21" />
  </ContentLoader>
);
