import React, { useState, useEffect } from 'react'
import axios from 'axios';

function GoalCard() {
  // when the user types in any one of the input fields,
  // then send the data to the backend to save it
  const [goalData, setGoalData] = useState({
    goal: '',
    time: '',
    cost: ''
  });

  // Fetch existing goal data when component mounts
  useEffect(() => {
    const fetchGoal = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_DOMAIN}/user/top-goal`,
          { withCredentials: true }
        );

        if (res.data && res.data.data) {
          setGoalData({
            goal: res.data.data.goal || '',
            time: res.data.data.time || '',
            cost: res.data.data.cost || ''
          });
        }
      } catch (error) {
        console.error('Error fetching goal:', error);
      }
    };

    fetchGoal();
  }, []);


  const handleBlur = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_DOMAIN}/user/top-goal`, goalData, { withCredentials: true }); 
    } catch (error) {
      console.error('Error saving goal:', error);
    }
  };

  return (
    <div className='goal-card card'>
      <div>
        <p className='card-header top-goal-card-header'>Top</p>
        <p className='card-header top-goal-card-header'>Goal</p>
        <input 
          type="text" 
          placeholder="Enter your goal"
          value={goalData.goal}
          onChange={(e) => setGoalData({ ...goalData, goal: e.target.value })}
          onFocus={(e) => (e.target.style.borderBottom = '2px solid #121313ff')}
          onBlur={(e) => {
            e.target.style.borderBottom = '2px solid #ccc';
            handleBlur();
          }} 
        />
      </div>
      <div className="goal-secondRow">
        <div>
          <p>Time period: </p>
          <input 
            type="text" 
            placeholder="Time to buy"
            value={goalData.time}
            onChange={(e) => setGoalData({ ...goalData, time: e.target.value })}
            onFocus={(e) => (e.target.style.borderBottom = '2px solid #121313ff')}
            onBlur={(e) => {
              e.target.style.borderBottom = '2px solid #ccc';
              handleBlur();
            }} 
          />
        </div>
        <div>
          <p>Estimated Cost: </p>
          <input 
            type="text" 
            placeholder="How much"
            value={goalData.cost}
            onChange={(e) => setGoalData({ ...goalData, cost: e.target.value })}
            onFocus={(e) => (e.target.style.borderBottom = '2px solid #121313ff')}
            onBlur={(e) => {
              e.target.style.borderBottom = '2px solid #ccc';
              handleBlur();
            }} 
          />
        </div>
      </div>
    </div>
  )
}

export default GoalCard