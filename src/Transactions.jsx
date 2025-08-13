import React, { useState, useEffect } from 'react'

import TransactionsCard from './TransactionsCard'
import TransactionForm from './TransactionForm'

function Transactions({ userId }) {
    const [formData, setFormData] = useState({
        amount: '',      // Required
        type: '',        // Required
        category: '',    // Required
        date: '',        // Required
    });
    const [showForm, setShowForm] = useState(false)
    const [AllData, setAllData] = useState(null)
    const [refreshFlag_T, setRefreshFlag_T] = useState(false)

    const refreshData_T = () => {
        setRefreshFlag_T(prev => !prev);  // toggle the flag
    }

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACKEND_DOMAIN}/user/fetch-transaction`, {
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
    }, [userId, refreshFlag_T]) 

    const handleAddTrans = () => {
        setShowForm(true);
    }

    const handleCloseForm = () => {
        setShowForm(false);
    }
    
  return (
    <div>
        <p className='take-heading' onClick={handleAddTrans}>
            Add Transaction <span className='take-plus'>+</span>
        </p>
        {showForm && 
            <div className="overlayForm">
                <TransactionForm onClose={handleCloseForm} formData={formData} setFormData={setFormData} userId={userId} refreshData={refreshData_T}/>
            </div>
        }
        {AllData && 
            AllData.slice(0, 6).map((data) => (
            <TransactionsCard key={data._id} id={data._id} Amt={data.amount} type={data.type} category={data.category} date={data.date} note={data.note} />
        ))}
    </div>
  )
}

export default Transactions