import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="container">
      <div className="jumbotron">
        <h1>Welcome to Authentication system...</h1>
        <p>This is a simple authentication system</p>
        <hr/>
        <Link to="/register" className="btn btn-primary mr-2">Register</Link>
        <Link to="/login" className="btn btn-secondary">Login</Link>
      </div>
    </div>
  );
};

export default HomePage;
