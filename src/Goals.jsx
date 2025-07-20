import React, { useState } from 'react'

function Goals() {
    const [haveGoals, setHaveGoals] = useState(false);

  return (
    <div>
        <h1>Set Your Goals</h1>
        <div className='goalDiv'>
            {haveGoals ? (
                <div>

                </div>
            ) : (
                <div className='no-goalDiv'>
                    <p>No Goals Have Been Set Yet.</p>
                    <div className='Add-goalDiv'>
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