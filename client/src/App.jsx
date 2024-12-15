import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from 'react-router-dom';
import Home from './pages/Home';
import styled from 'styled-components';
import MyMap from './pages/MyMap';
import { ToastContainer } from 'react-toastify';
// import HomeSvg from './assets/home.svg?react';
// import UserHomeSvg from './assets/userhome.svg?react';
import ProtectedRoute from './components/ProtectedRoute';

import { jwtDecode } from 'jwt-decode';
import Signout from './pages/Signout';

import SharedLayout from './components/SharedLayout';

import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import EditMarker from './pages/EditMarker';
import NotFound from './components/NotFound';

const App = () => {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (!token || isTokenExpired(token)) {
  //     // Token is invalid or expired
  //     localStorage.removeItem('token'); // Clear invalid token
  //     navigate('/login'); // Redirect to login
  //   }
  // }, [navigate]);

  return (
    <Router>
      {/* <S.Navbar>
        <S.NavLink to="/">
          <HomeIcon />
        </S.NavLink>
        <S.NavLink to="/mymap">
          <UserHomeIcon />
        </S.NavLink>

      </S.Navbar> */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        style={{ zIndex: 1000 }}
      />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <EditMarker />
            </ProtectedRoute>
          }
        />

        <Route element={<SharedLayout />}>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mymap"
            element={
              <ProtectedRoute>
                <MyMap />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signout"
            element={
              <ProtectedRoute>
                <Signout />
              </ProtectedRoute>
            }
          />
          {/* <Route
            path="/edit/:id"
            element={
              <ProtectedRoute>
                <EditMarker />
              </ProtectedRoute>
            }
          /> */}
        </Route>

        {/* <Route path="/signout" element={<Signout />} /> */}

        {/* <Route path="/" element={<Home />} /> */}
        {/* <Route path="/mymap" element={<MyMap />} /> */}
        {/* <Route path="/dropdown" element={<Dropdown />} /> */}
      </Routes>
    </Router>
  );
};

function isTokenExpired(token) {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Current time in seconds
    return decoded.exp < currentTime; // Returns true if the token is expired
  } catch (error) {
    return true; // Invalid token
  }
}

const S = {};
S.Navbar = styled.nav`
  position: absolute;
  top: 0;
  left: 0;

  z-index: 2;
  width: 100%;

  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;

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

export default App;
