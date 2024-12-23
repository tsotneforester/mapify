import { Outlet, useLocation } from 'react-router-dom';
import { useState } from 'react';

import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import HomeSvg from '../assets/home.svg?react';
import UserHomeSvg from '../assets/userhome.svg?react';
import SignoutSvg from '../assets/signout.svg?react';
import NavbarSvg from '../assets/navbar.svg?react';
import MenuSvg from '../assets/Menu.svg?react';
const API_URL = import.meta.env.VITE_API_URL;

const SharedLayout = () => {
  const location = useLocation();
  const user = sessionStorage.getItem('user');
  const avatar = sessionStorage.getItem('avatar');

  const [extended, setExtended] = useState(false);
  const [showModalNav, setshowModalNav] = useState(false);

  // Define routes where the Navbar should not appear
  const excludedRoutes = ['/login', '/signup'];

  return (
    <>
      {!excludedRoutes.includes(location.pathname) && (
        <>
          <S.MiniNavbar>
            <S.User2>
              <img
                src={`${API_URL}/uploads/avatars/${avatar}`}
                alt={user}
                title={user}
              />
              <p>{user}</p>
            </S.User2>
            <MenuIcon onClick={() => setshowModalNav((e) => !e)} />
          </S.MiniNavbar>

          <S.Navbar $extended={extended} $open={showModalNav}>
            <main>
              <NavbarIcon onClick={() => setExtended((e) => !e)} />
              <S.NavLink to="/" onClick={() => setshowModalNav((e) => !e)}>
                <HomeIcon title="home" />
                <p>Home</p>
              </S.NavLink>
              <S.NavLink to="/mymap" onClick={() => setshowModalNav((e) => !e)}>
                <UserHomeIcon title="mymap" />

                <p>Mymap</p>
              </S.NavLink>
              <S.NavLink
                to="/payment"
                onClick={() => setshowModalNav((e) => !e)}
              >
                <UserHomeIcon title="payment" />

                <p>Holy</p>
              </S.NavLink>
            </main>
            <footer>
              <S.User1>
                <img
                  src={`${API_URL}/uploads/avatars/${avatar}`}
                  alt="tso"
                  title={user}
                />
                <p>{user}</p>
              </S.User1>

              <S.NavLink to="/signout">
                <SignoutIcon title="logout" />
                <p>Logout</p>
              </S.NavLink>
            </footer>
          </S.Navbar>
        </>
      )}
      <main>
        <Outlet /> {/* Renders the nested routes */}
      </main>
    </>
  );
};

export default SharedLayout;

const S = {};

S.MiniNavbar = styled.div`
  position: absolute;
  top: 0;
  left: 12px;
  z-index: 2;
  width: calc(100% - 2 * 12px);
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  background-color: #003738de;
  border-radius: 10px;
  align-items: center;
  margin: 12px 0;
  padding: 6px;

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
  img {
    border-radius: 50%;
    width: 36px;
    height: 36px;
    flex-shrink: 0;
  }
  p {
    font-family: 'Doto', sans-serif;
    font-weight: 800;
  }
`;

S.Navbar = styled.nav`
  position: absolute;
  top: 64px;
  left: 12px;
  z-index: 2;
  width: calc(100% - 2 * 12px);
  display: ${(prop) => (prop.$open ? 'flex' : 'none')};
  flex-flow: column nowrap;
  justify-content: space-between;
  background-color: #003738de;
  border-radius: 10px;
  margin: 12px 0;

  padding: 10px;
  height: auto;
  line-height: normal;
  gap: 30px;

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    top: 0;
    height: calc(100vh - 2 * 12px);
    height: calc(100vh - 2 * 12px);
    width: ${(prop) => (prop.$extended ? '170px' : '54px')};
    flex-flow: column nowrap;
    transition: all 0.5s linear;
    overflow: hidden;
    display: flex;
  }

  main {
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    }
    p {
      font-family: 'Doto', sans-serif;
      font-weight: 800;
    }
  }

  footer {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
      flex-flow: column nowrap;
      justify-content: flex-start;
      align-items: flex-start;
    }
    img {
      border-radius: 50%;
      width: 32px;
      height: 32px;
      flex-shrink: 0;
      display: none;
      @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
        display: block;
      }
    }
    p:last-of-type {
      font-family: 'Doto', sans-serif;
      font-weight: 800;

      //display: none;
    }
  }
`;

S.NavLink = styled(NavLink)`
  font-size: 28px;
  color: #86bee29e;
  font-weight: 900;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;

  &.active {
    font-weight: bold;
    color: #ffffff;
  }
`;

const StyledIcon = styled(({ component: Component, ...props }) => (
  <Component {...props} />
))`
  width: 32px;
  flex-shrink: 0;
`;

const HomeIcon = styled(StyledIcon).attrs({ component: HomeSvg })``;
const UserHomeIcon = styled(StyledIcon).attrs({ component: UserHomeSvg })``;
const SignoutIcon = styled(StyledIcon).attrs({ component: SignoutSvg })``;
const MenuIcon = styled(StyledIcon).attrs({ component: MenuSvg })`
  display: block;
  transition: color 0.5s linear;
  color: #86bee29e;
  &:hover {
    color: white;
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
    color: white;
  }
`;
const NavbarIcon = styled(StyledIcon).attrs({ component: NavbarSvg })`
  display: none;
  &:hover {
    color: white;
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: block;
    align-self: flex-end;
    transition: color 0.5s linear;
    color: #86bee29e;
  }
`;

S.User1 = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  font-size: 28px;
  color: #86bee29e;
  font-family: 'Doto', sans-serif;
  font-weight: 800;
  display: none;
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: flex;
    width: 100%;
  }
`;

S.User2 = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  font-size: 28px;
  color: #86bee29e;
  font-family: 'Doto', sans-serif;
  font-weight: 800;
`;
