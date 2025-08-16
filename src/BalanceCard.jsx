import React, { useState, useEffect } from 'react'
import { WalletCards } from 'lucide-react';

function BalanceCard() {
  const [isEditing, setIsEditing] = useState(false);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    // GET THE CURRENT BALANCE FROM THE BACKEND
    fetch(`${import.meta.env.VITE_BACKEND_DOMAIN}/user/balance`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'  // send the cookie
    })
    .then(async res => {
      if (!res.ok) throw new Error('Failed to update balance');
      const data = await res.json();
      setBalance(data.balance ?? 0);
    })
    .catch(err => console.error('Error:', err));
  }, []);

  const handleEditBtn = () => {
    setIsEditing(prev => !prev);
  };

  const handleInputChange = (e) => {
    const newBalance = Number(e.target.value);
    setBalance(newBalance);
  };

  // Means don't call handleBlur when clicked on icon
  const handleBlur = () => {
    setIsEditing(false);

    // SEND THE UPDATED BALANCE TO THE BACKEND
    fetch(`${import.meta.env.VITE_BACKEND_DOMAIN}/user/balance`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ updateBal: balance }),
      credentials: 'include'  // send the cookie
    })
    .then(async res => {
      if (!res.ok) throw new Error('Failed to update balance');
      const data = await res.json();        
    })
    .catch(err => console.error('Error:', err));
    
  };

  return (
    <div className='balance-card card'>
      <div className='balance-card-header-div'>
        {isEditing ? (
          <input
            type='number'
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
      <div className='balance-card-icon mt-8'>
        <WalletCards size={60} color='#121313' />
      </div>
    </div>
  )
}

export default BalanceCard