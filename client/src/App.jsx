import { HashRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Home from './pages/Home';
import { ToastContainer } from 'react-toastify';
// import HomeSvg from './assets/home.svg?react';
// import UserHomeSvg from './assets/userhome.svg?react';
import ProtectedRoute from './components/ProtectedRoute';
import SharedLayout from './components/SharedLayout';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import EditMarker from './pages/EditMarker';

import CheckEmail from './pages/CheckEmail';
import VerifyUser from './pages/VerifyUser';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ProcessPayment from './pages/ProcessPayment';
import PageNotFound from './pages/PageNotFound';
import User from './pages/User';

// import Payment from './pages/Payment';

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
        <Route path="/check-email" element={<CheckEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-user/:jwt" element={<VerifyUser />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route
          path="/processing"
          element={
            <ProtectedRoute>
              <ProcessPayment />
            </ProtectedRoute>
          }
        />
        {/* <Route path="/payment" element={<Payment />} /> */}
        {/* <Route path="/reset/:token" element={<ResetPassword />} /> */}
        <Route path="*" element={<PageNotFound />} />
        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <User />
            </ProtectedRoute>
          }
        />
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
        </Route>
      </Routes>
    </Router>
  );
};

// function isTokenExpired(token) {
//   try {
//     const decoded = jwtDecode(token);
//     const currentTime = Date.now() / 1000; // Current time in seconds
//     return decoded.exp < currentTime; // Returns true if the token is expired
//   } catch (error) {
//     return true; // Invalid token
//   }
// }

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
