import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate('/');
  };

  return (
    <div className="container mt-5 text-center">
      <h1>Welcome to your to-do app</h1>
      <p className="lead">
        This is a simple to-do application designed to help you organize your tasks.
        Add, edit, and track your to-dos efficiently.
      </p>
      <button className="btn btn-primary mt-3" onClick={handleStartClick}>
        Start
      </button>
    </div>
  );
};

export default LandingPage;