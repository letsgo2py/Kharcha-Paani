import React from 'react'

function TakeMoneyCard({ id, Amt, TakeFrom, Date, Interest, Period, Reason, setReminderForm, setReminderFormData, setIdToDelete, refreshData }) {
    // const { amount, takeFrom, tookOn, interest, interestPeriod, reason } = props.formData || {};
    // const HaveDate = tookOn ? true : false;
    // const HaveInterest = interest ? true : false;

    // {amount && <p>💸 Take Rs.{' '}{amount} from {takeFrom}</p> }
    //     { HaveDate && <p>📅 You took on {tookOn}</p> }
    //     {/* SImple interest or compound interest  */}
    //     {HaveInterest && <p>📈 Interest: {interest}%, {interestPeriod}</p>}
    //     {reason && <p>🤔 Reason: "{reason}"</p>}
    //     {amount && <p>🕒 Remind me to ask for Money (via email)<span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bell" viewBox="0 0 16 16">
    //         <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6"/>
    //         </svg></span>
    //     </p>}

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
      takeFrom: TakeFrom,
      date: Date.slice(0, 10),
    })
  }

  return (
    <div className='take-money-card'>
      <div className='checkbox-div'>
        <input type="checkbox" onClick={handleBox}/>
      </div>
      <p>💸 Take <span>Rs.{Amt}</span> from <span>{TakeFrom}</span></p>
      {Date && <p>📅 You gave on <span>{Date.slice(0, 10)}</span></p>}
      {Interest && <p>📈 Interest: {Interest}%, {Period}</p>}
      {Reason && <p>🤔 <span>Reason:</span> <span style={{fontSize: '1rem', fontStyle: 'italic', padding: 0, backgroundColor: 'white'}}>"{Reason}"</span></p>}
      <div className='reminder-div' >
        <i className="bi bi-alarm" onClick={handleReminder}></i>
        <i className="bi bi-trash" onClick={handleDeletion}></i>
      </div>
    </div>
  )
}

export default TakeMoneyCard