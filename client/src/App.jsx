import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import styled from 'styled-components';
import MyMap from './pages/MyMap';
import { ToastContainer } from 'react-toastify';
import HomeSvg from './assets/home.svg?react';
import UserHomeSvg from './assets/userhome.svg?react';

import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <Router>
      <S.Navbar>
        <S.NavLink to="/">
          <HomeIcon />
        </S.NavLink>
        <S.NavLink to="/mymap">
          <UserHomeIcon />
        </S.NavLink>
      </S.Navbar>
      <ToastContainer position="top-right" autoClose={5000} style={{ zIndex: 1000 }} />

      <Routes>
        <Route path="/" element={<Home />} />\
        <Route path="/mymap" element={<MyMap />} />
      </Routes>
    </Router>
  );
};

const S = {};
S.Navbar = styled.nav`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  height: 100svh;
  z-index: 2;

  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: #030a12a7;
  padding: 20px;
`;

S.NavLink = styled(NavLink)`
  font-size: 28px;
  color: #f3f3f3;
  font-weight: 900;
  &.active {
    font-weight: bold;
    color: #d60707;
  }
`;

S.Main = styled.main`
  width: 100vw;
  height: 100vh;
  height: 100svh;
`;

const StyledIcon = styled(({ component: Component, ...props }) => <Component {...props} />)`
  width: 32px;
`;

const HomeIcon = styled(StyledIcon).attrs({ component: HomeSvg })``;
const UserHomeIcon = styled(StyledIcon).attrs({ component: UserHomeSvg })``;

export default App;
