import React, { useState } from 'react'

function ScheduleEmailForm({ setReminderForm }) {
    const [email, setEmail] = useState(null)
    const [reminderTime, setReminderTime] = useState(null)

    const handleSchedule = async (e) => {
      console.log("handle called")
      e.preventDefault(); 

      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_DOMAIN}/user/schedule-email`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: email,
            subject: 'Money Reminder',
            text: 'Reminder: You took some money.',
            datetime: reminderTime
          }),
          credentials: 'include'
        })

        if (response.ok) {
          alert("Reminder scheduled successfully!");
          setReminderForm(false); // Close the form if needed
        } else {
          const errorData = await response.json();
          alert("Failed to schedule reminder: " + errorData.message);
        }
      } catch (error) {
        console.error("Error scheduling reminder:", error);
        alert("An error occurred while scheduling the reminder.");
      }
    }

  return (
    <div className='takemoney-form'>
      <button className="close-button" onClick={() => {setReminderForm(false)}}>X</button>
      <h2>Reminder Details</h2>
      <form onSubmit={handleSchedule} className="takemoney-form-body">
        <input 
            type="email" 
            placeholder="Enter email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required
        />
        <input 
            type="datetime-local" 
            value={reminderTime} 
            onChange={(e) => setReminderTime(e.target.value)} 
            required
        />
        <button type="submit" className="submit-button">Schedule Reminder</button>
      </form>
    </div>
  )
}

export default ScheduleEmailForm