import React, { useState } from 'react';

function TakeMoneyForm({ onClose, formData, setFormData, userId, refreshData }) {
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSend = {
      ...formData,
      user: userId,
    };

    onClose(); // close the form

    // Send the filled data to database
    fetch(`${import.meta.env.VITE_BACKEND_DOMAIN}/user/takemoney`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSend),
      credentials: 'include'  // store the cookie
    })
    .then(async res => {
      const data = await res.json();
      
    })
    .catch(err => console.error('Error:', err));

    // Change the flag
    refreshData();
  };

  return (
    <div className='takemoney-form'>
      <button className="close-button" onClick={onClose}>X</button>
      <h2>Take Money Form</h2>
      <form onSubmit={handleSubmit} className="takemoney-form-body">
        <label>
          Amount:
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Take From:
          <input
            type="text"
            name="takeFrom"
            value={formData.takeFrom}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Took On:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </label>

        <label>
          Interest:
          <input
            type="number"
            name="interest"
            value={formData.interest}
            onChange={handleChange}
          />
        </label>

        <label>
            Interest Time Period:
            <select
                name="interestPeriod"
                value={formData.interestPeriod}
                onChange={handleChange}
            >
                <option value="">None</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
            </select>
        </label>

        <label>
          Reason:
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
          ></textarea>
        </label>

        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
}

export default TakeMoneyForm;
