import React, { useState, useEffect } from 'react'


import GiveMoneyForm from './GiveMoneyForm';
import GiveMoneyCard from './GiveMoneyCard';
import ScheduleEmailForm from './EmailScheduleForm';

function GiveMoney({ userId, refreshData, refreshFlag}) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    amount: '',   // Required
    giveTo: '', // Required
    date: '',
    interest: '',
    interestPeriod: '',
    reason: ''
  });

  const [AllData, setAllData] = useState(null);
  const [reminderForm, setReminderForm] = useState(false);
  
  const [IdToDelete, setIdToDelete] = useState(null);
  
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_DOMAIN}/user/fetch-givemoney`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId }),
      credentials: 'include'  // send the cookie
    })
    .then(async res => {
      const data = await res.json();
      setAllData(data.records); 
    })
    .catch(err => console.error('Error:', err));
  }, [userId, refreshFlag])

  const handleAddGiveMoney = () => {
    setShowForm(true);
  }

  const handleCloseForm = () => {
    setShowForm(false);
  };

  useEffect(() => {
    if (!IdToDelete) return; // prevent running on initial render
    fetch(`${import.meta.env.VITE_BACKEND_DOMAIN}/user/delete-GiveRecord`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId, Id: IdToDelete }),
      credentials: 'include'  // send the cookie
    })
    .then(async res => {
      const data = await res.json();
      setAllData(data.records); 
      setIdToDelete(null);
    })
    .catch(err => console.error('Error:', err));
  }, [IdToDelete])

  return (
    <div className='record-list-div'>
      <p className='take-heading' onClick={handleAddGiveMoney}>
        GiveMoney <span className='take-plus'>+</span>
      </p>
      {showForm && (
        <div className="overlayForm">
          <GiveMoneyForm onClose={handleCloseForm} formData={formData} setFormData={setFormData} userId={userId} refreshData={refreshData}/>
        </div>
      )}
      {reminderForm && (
        <div className="overlayForm">
          <ScheduleEmailForm setReminderForm={setReminderForm}/>
        </div>
      )}
      {AllData && 
        AllData.map((data) => (
          <GiveMoneyCard key={data._id} id={data._id} Amt={data.amount} GiveTo={data.giveTo} Date={data.date} Interest={data.interest} Period={data.interestPeriod} Reason={data.reason} setReminderForm={setReminderForm} setIdToDelete={setIdToDelete}/>
      ))}
      {(AllData && AllData.length === 0) && (
        <p className='no-data-msg'>Add the Entry.</p>
      )}
    </div>
  )
}

export default GiveMoney