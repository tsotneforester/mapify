//import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';

import Marker from './pages/Marker';
import Icons from './pages/Icons';
import Home from './pages/Home';
import styled from 'styled-components';

import MyMap from './pages/MyMap';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//FEATURE react-toastify, .env, reactleaflet cluster

const App = () => {
  return (
    <Router>
      <S.Navbar>
        <div>
          {/* FIX cotainer name */}
          <S.NavLink to="/">Home</S.NavLink>
          <S.NavLink to="/mymap">My Map</S.NavLink>
        </div>
        <div>
          {/* FIX cotainer name */}
          <S.NavLink to="/marker">marker</S.NavLink>
          <S.NavLink to="/icons">icons</S.NavLink>
        </div>
      </S.Navbar>
      <ToastContainer position="top-right" autoClose={5000} style={{ zIndex: 1000 }} />

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
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: flex-start;
  background-color: #9fc197;
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

//

export default App;
