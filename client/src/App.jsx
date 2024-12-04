//import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';

import Marker from './pages/Marker';
import Icons from './pages/Icons';
import Home from './pages/Home';
import styled from 'styled-components';

import MyMap from './pages/MyMap';

//import { ToastContainer } from 'react-toastify';
import HomeSvg from './assets/home.svg?react';
import UserHomeSvg from './assets/userhome.svg?react';
import AddMarkerSvg from './assets/addmarker.svg?react';
import HexSvg from './assets/hex.svg?react';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <Router>
      <S.Navbar>
        <div>
          <S.NavLink to="/">
            <HomeIcon />
          </S.NavLink>
          <S.NavLink to="/mymap">
            <UserHomeIcon />
          </S.NavLink>
        </div>
        <div>
          <S.NavLink to="/marker">
            <AddMarkerIcon />
          </S.NavLink>
          <S.NavLink to="/icons">
            <HexIcon />
          </S.NavLink>
        </div>
      </S.Navbar>
      {/* <ToastContainer position="top-right" autoClose={5000} style={{ zIndex: 1000 }} /> */}

      <Routes>
        <Route path="/" element={<Home />} />\
        <Route path="/mymap" element={<MyMap />} />
        <Route path="/marker" element={<Marker />} />
        <Route path="/icons" element={<Icons />} />
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
  justify-content: space-between;
  align-items: flex-start;
  background-color: #030a12a7;
  padding: 20px;

  & > div {
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: flex-start;
  }
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

const HomeIcon = styled(HomeSvg)`
  width: 32px;
`;

const UserHomeIcon = styled(UserHomeSvg)`
  width: 32px;
`;

const AddMarkerIcon = styled(AddMarkerSvg)`
  width: 32px;
`;
const HexIcon = styled(HexSvg)`
  width: 32px;
`;

export default App;
