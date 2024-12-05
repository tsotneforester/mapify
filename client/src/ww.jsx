import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, useLocation } from 'react-router-dom';

const Modal = ({ onClose }) => (
  <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}>
    <div style={{ background: 'white', padding: '20px', margin: '100px auto', width: '300px' }}>
      <h2>Modal Content</h2>
      <button onClick={onClose}>Close</button>
    </div>
  </div>
);

const Home = () => <h2>Home Page</h2>;
const About = () => <h2>About Page</h2>;

const App = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const location = useLocation();

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <h1>My App</h1>
      <Link to="/">Home</Link>
      <Link to="/about" onClick={openModal}>
        Open Modal
      </Link>

      <Route path="/" exact component={Home} />
      <Route path="/about" component={About} />

      {isModalOpen && <Modal onClose={closeModal} />}
    </div>
  );
};

const Main = () => (
  <Router>
    <App />
  </Router>
);

export default Main;
