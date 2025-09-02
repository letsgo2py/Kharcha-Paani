import React from 'react'

function GiveMoneyCard({ id, Amt, GiveTo, Date, Interest, Period, Reason, setReminderForm, setReminderFormData, setIdToDelete, refreshData }) {

  const handleDeletion = () => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      setIdToDelete(id);
    }
  }

  const handleBox = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_DOMAIN}/user/${id}/mark`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ marked: true }),
        credentials: 'include'  // send the cookie
      });

      if (!response.ok) {
        throw new Error('Failed to update');
      }

      const data = await response.json();
      refreshData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleReminder = () => {
    setReminderForm(true);
    setReminderFormData({
      amount: Amt,
      giveTo: GiveTo,
      date: Date.slice(0, 10),
    })
  }

  return (
    <div className='take-money-card give-money-card'>
      <div className='checkbox-div'>
        <input type="checkbox" onClick={handleBox}/>
      </div>
      <p>💸 Give <span>Rs.{Amt}</span> to <span>{GiveTo}</span></p>
      {Date && <p>📅 You took on <span>{Date.slice(0, 10)}</span></p>}
      {Interest && <p>📈 Interest: {Interest}%, {Period}</p>}
      {Reason && <p>🤔 <span>Reason:</span> <span style={{fontSize: '1rem', fontStyle: 'italic', padding: 0, backgroundColor: 'white'}}>"{Reason}"</span></p>}
      <div className='reminder-div' >
        <i className="bi bi-alarm" onClick={handleReminder}></i>
        <i className="bi bi-trash" onClick={handleDeletion}></i>
      </div>
    </div>
  )
}

export default GiveMoneyCard