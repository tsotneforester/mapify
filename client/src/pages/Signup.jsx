import React from 'react';

const Login = () => {
  const handleClick = async () => {
    const userConfirmed = window.confirm('Are you sure you want to proceed?');
    if (userConfirmed) {
      // Proceed with the action
      console.log('Action confirmed!');
    } else {
      // Action canceled
      console.log('Action canceled.');
    }
  };

  return <button onClick={handleClick}>Click Me</button>;
};

export default Login;
