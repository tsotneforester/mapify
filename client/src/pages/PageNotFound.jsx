import styled from 'styled-components';
import myImage from '../assets/doNotEnter.png';
import { Link } from 'react-router-dom';

// import { AppContext } from '../Context';

import SharedAuth from '../components/SharedAuth';

const PageNotFound = () => {
  return (
    <SharedAuth>
      <S.Container>
        <S.Digits>
          <h1>4</h1>
          <img
            src={myImage} // Replace with your image URL
            alt="no enter"
          />
          <h1>4</h1>
        </S.Digits>

        <p>Sorry, the page you are looking for does not exist.</p>
        <Link to="/" className="home-link">
          Go to Home
        </Link>
      </S.Container>
    </SharedAuth>
  );
};

export default PageNotFound;

const S = {};
S.Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
`;
S.Digits = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: baseline;

  h1 {
    font-size: 144px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: #7f7f7f;
    font-weight: 700;
    text-align: center;
  }
`;
