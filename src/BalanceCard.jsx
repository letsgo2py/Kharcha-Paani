import React, { useState } from 'react'

function BalanceCard({ User }) {
  const [isEditing, setIsEditing] = useState(false);
  
  const balanceFromDB = User.current_balance;
  const [balance, setBalance] = useState(balanceFromDB);


  const handleEditBtn = () => {
    setIsEditing(prev => !prev);
  };

  const handleInputChange = (e) => {
    const newBalance = Number(e.target.value);
    setBalance(newBalance);

    // Also Set the balance in the mongoDB
    const userUpdate = {
      email: User.email,
      updateBal: newBalance,
    }

    fetch(`${import.meta.env.VITE_BACKEND_DOMAIN}/user/balance`, {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(userUpdate),
      credentials: 'include'  // store the cookie
    })
    .then(async res => {
      if (!res.ok) {
        throw new Error('Failed to update balance');
      }
      const data = await res.json();
      console.log('Balance updated:', data);
        
    })
    .catch(err => console.error('Error:', err));
    
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  return (
    <div className='balance-card card'>
      <div className='balance-card-header-div'>
        {isEditing ? (
          <input
            type='text'
            value={balance}
            onChange={handleInputChange}
            onBlur={handleBlur}
            autoFocus
            className='form-control'
          />
        ) : (
          <p className='balance card-header'>Rs. {balance}</p>
        )}

        <i
          className='bi bi-pencil-fill'
          style={{ cursor: 'pointer', marginLeft: '10px' }}
          onClick={handleEditBtn}
        ></i>
      </div>
      <p className='subheading'>Current Balance</p>
    </div>
  )
}

export default BalanceCard