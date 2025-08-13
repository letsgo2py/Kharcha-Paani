import React, { useState, useEffect } from 'react';

import TakeMoneyForm from './TakeMoneyForm';
import TakeMoneyCard from './TakeMoneyCard';
import ScheduleEmailForm from './EmailScheduleForm';

function TakeMoney({ userId, refreshData, refreshFlag}) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    amount: '',   // Required
    takeFrom: '', // Required
    date: '',
    interest: '',
    interestPeriod: '',
    reason: ''
  });

  const [AllData, setAllData] = useState([])
  const [reminderForm, setReminderForm] = useState(false);
  const [showAll, setShowAll] = useState(false);


  const [IdToDelete, setIdToDelete] = useState(null);


  // const visibleData = showAll ? (AllData || []).slice() : (AllData || []).slice(0, 6);
  
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_DOMAIN}/user/fetch-takemoney`, {
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

  const handleAddTakeMoney = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);


  useEffect(() => {
    if (!IdToDelete) return; // prevent running on initial render
    fetch(`${import.meta.env.VITE_BACKEND_DOMAIN}/user/delete-TakeRecord`, {
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
      console.log("Deleted")
    })
    .catch(err => console.error('Error:', err));
  }, [IdToDelete])

  // LATER USE
  // <div key={data._id}>
  //           <p>💸 Take Rs. {data.amount} from {data.takeFrom}</p>
  //           {data.date && <p>📅 You took on {data.date}</p>}
  //           {data.interest && <p>📈 Interest: {data.interest}%, {data.interestPeriod}</p>}
  //           {data.reason && <p>🤔 Reason: "{data.reason}"</p>}
  //         </div>

  return (
    <div className='record-list-div'>
      <p className='take-heading' onClick={handleAddTakeMoney}>
        TakeMoney <span className='take-plus'>+</span>
      </p>
      {showForm && (
        <div className="overlayForm">
          <TakeMoneyForm onClose={handleCloseForm} formData={formData} setFormData={setFormData} userId={userId} refreshData={refreshData}/>
        </div>
      )}
      {reminderForm && (
        <div className="overlayForm">
          <ScheduleEmailForm setReminderForm={setReminderForm}/>
        </div>
      )}
      {AllData && 
        AllData.slice(0, 6).map((data) => (
          <TakeMoneyCard key={data._id} id={data._id} Amt={data.amount} TakeFrom={data.takeFrom} Date={data.date} Interest={data.interest} Period={data.interestPeriod} Reason={data.reason} setReminderForm={setReminderForm} setIdToDelete={setIdToDelete} refreshData={refreshData}/>
      ))}
      {AllData.length > 6 && (
        <p
          style={{ color: 'blue', cursor: 'pointer' }}
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? 'Show less' : 'Show more'}
        </p>
      )}
      {(AllData && AllData.length === 0) && (
        <p className='no-data-msg'>Add the Entry.</p>
      )}
    </div>
  )
}

export default TakeMoney