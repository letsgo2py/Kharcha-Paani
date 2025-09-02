import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TopGoalDisplay({ user }) {
  const [topGoal, setTopGoal] = useState({
    goal: '',
    time: '',
    cost: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopGoal = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_DOMAIN}/user/top-goal`,
          { withCredentials: true }
        );

        if (res.data && res.data.data) {
          setTopGoal({
            goal: res.data.data.goal || '',
            time: res.data.data.time || '',
            cost: res.data.data.cost || ''
          });
        }
      } catch (error) {
        console.error('Error fetching top goal:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopGoal();
  }, []);

  if (loading) {
    return (
      <div className="top-goal-display-container">
        <h3>Top Goal</h3>
        <p>Loading...</p>
      </div>
    );
  }

  if (!topGoal.goal) {
    return (
      <div className="top-goal-display-container">
        <h3>Top Goal</h3>
        <div className="no-goal">
          <p>No goal set yet</p>
          <p className="suggestion">Visit the Goals section to set your top goal!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="top-goal-display-container">
      <h3>Top Goal</h3>
      <div className="goal-details">
        <div className="goal-item">
          <span className="goal-label">Goal:</span>
          <span className="goal-value">{topGoal.goal}</span>
        </div>
        {topGoal.time && (
          <div className="goal-item">
            <span className="goal-label">Time Period:</span>
            <span className="goal-value">{topGoal.time}</span>
          </div>
        )}
        {topGoal.cost && (
          <div className="goal-item">
            <span className="goal-label">Estimated Cost:</span>
            <span className="goal-value">₹{topGoal.cost}</span>
          </div>
        )}
      </div>
      <div className="goal-actions">
        <button 
          className="edit-goal-btn"
          onClick={() => window.location.href = '/goals'}
        >
          Edit Goal
        </button>
      </div>
    </div>
  );
}

export default TopGoalDisplay;
