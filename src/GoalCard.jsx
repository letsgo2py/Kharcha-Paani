import React from 'react'

function GoalCard() {
  return (
    <div className='goal-card card'>
        <div>
          <p className='card-header'>Goal</p>
          <input 
            type="text" placeholder="Enter your goal"
            onFocus={(e) => (e.target.style.borderBottom = '2px solid #121313ff')}
            onBlur={(e) => (e.target.style.borderBottom = '2px solid #ccc')} 
          />
        </div>
        <div className="goal-secondRow">
          <div>
            <p>Time period: </p>
            <input 
              type="text" placeholder="Time to buy"
              onFocus={(e) => (e.target.style.borderBottom = '2px solid #121313ff')}
              onBlur={(e) => (e.target.style.borderBottom = '2px solid #ccc')} 
            />
          </div>
          <div>
            <p>Estimated Cost: </p>
            <input 
              type="text" placeholder="How much"
              onFocus={(e) => (e.target.style.borderBottom = '2px solid #121313ff')}
              onBlur={(e) => (e.target.style.borderBottom = '2px solid #ccc')} 
            />
          </div>
        </div>
    </div>
  )
}

export default GoalCard