import { Outlet, useLocation } from 'react-router-dom';

import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import HomeSvg from '../assets/home.svg?react';
import UserHomeSvg from '../assets/userhome.svg?react';
import SignoutSvg from '../assets/signout.svg?react';

const SharedLayout = () => {
  const location = useLocation();

  // Define routes where the Navbar should not appear
  const excludedRoutes = ['/login'];

  return (
    <>
      {!excludedRoutes.includes(location.pathname) && (
        <S.Navbar>
          <main>
            <S.NavLink to="/">
              <HomeIcon />
            </S.NavLink>
            <S.NavLink to="/mymap">
              <UserHomeIcon />
            </S.NavLink>
          </main>
          <footer>
            <S.NavLink to="/signout">
              <SignoutIcon />
            </S.NavLink>
          </footer>
        </S.Navbar>
      )}
      <main>
        <Outlet /> {/* Renders the nested routes */}
      </main>
    </>
  );
};

export default SharedLayout;

const S = {};
S.Navbar = styled.nav`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  background-color: #030a12a7;
  padding: 14px;
  padding: 14px;
  height: auto;
  line-height: normal;

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 100vh;
    height: 100svh;
    width: auto;
    flex-flow: column nowrap;
  }

  main {
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
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

const StyledIcon = styled(({ component: Component, ...props }) => <Component {...props} />)`
  width: 32px;
`;

const HomeIcon = styled(StyledIcon).attrs({ component: HomeSvg })``;
const UserHomeIcon = styled(StyledIcon).attrs({ component: UserHomeSvg })``;
const SignoutIcon = styled(StyledIcon).attrs({ component: SignoutSvg })``;
