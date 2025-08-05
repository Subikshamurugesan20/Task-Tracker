import React from 'react';
import { useNavigate } from 'react-router-dom';

function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <h1>Welcome to Task Tracker</h1>
      <p>“The secret of getting ahead is getting started.”</p>
      <button onClick={() => navigate('/tasks')}>Add Task</button>
    </div>
  );
}

export default Welcome;
