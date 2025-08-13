import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import GoalCard from './GoalCard';
import { BadgePlus } from 'lucide-react';


function Goals() {
    const navigate = useNavigate();
    const [haveGoals, setHaveGoals] = useState(false);
    const [goalData, setGoalData] = useState([]);

    const handleAddGoal = () => {
        navigate('/add-goal'); 
    }

    // Fetch the goal data from the backend
    useEffect(() => {
        const fetchGoals = async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_BACKEND_DOMAIN}/user/goals`,
                { withCredentials: true }
            );

        // if (res.data && res.data.data) {
        //     setGoalData({
        //     goal: res.data.data.goal || '',
        //     time: res.data.data.time || '',
        //     cost: res.data.data.cost || ''
        //     });
        // }
            if (res.data && res.data.goals) {
                setGoalData(res.data.goals);
                setHaveGoals(res.data.goals.length > 0);
            } else {
                setHaveGoals(false);
            }
        } catch (error) {
            console.error('Error fetching goal:', error);
        }
    };

    fetchGoals();
    }, []);

    console.log('Goal Data:', goalData);

  return (
    <div>
        <h1>Set Your Goals<span onClick={handleAddGoal} className='add-goal-btn'>Add<BadgePlus/></span></h1>
        <div className='goalDiv flex flex-row flex-wrap gap-4 justify-center'>
        {haveGoals ? (
            goalData.map((goal, index) => (
                <GoalCard key={index} goal={goal}/>
            ))
        ) : (
            <div className='no-goalDiv'>
                <p>No Goals Have Been Set Yet.</p>
                <div className='Add-goalDiv' onClick={handleAddGoal}>
                    <p className='add-goal'>Add One</p>
                    <i className="bi bi-plus-circle add-sym"></i>
                </div>
            </div>
        )}
        </div>
    </div>
  )
}

export default Goals