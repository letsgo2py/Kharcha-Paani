import React from 'react'

function TransactionForm({ onClose, formData, setFormData, userId, refreshData }) {
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
    fetch(`${import.meta.env.VITE_BACKEND_DOMAIN}/user/transaction-add`, {
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
      <h2>Transaction Form</h2>
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
          Type:
          <select name="type" value={formData.type} onChange={handleChange} required>
            <option value="">Select Type</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </label>

        <label>
          Category:
          <select name="category" value={formData.category} onChange={handleChange} required>
            <option value="">Select Category</option>
            <option value="food">Food</option>
            <option value="transport">Transport</option>
            <option value="rent">Rent</option>
            <option value="salary">Salary</option>
            <option value="freelance">Freelance</option>
            <option value="shopping">Shopping</option>
            <option value="uncategorized">Uncategorized</option>
          </select>
        </label>

        <label>
          Date:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  )
}

export default TransactionForm