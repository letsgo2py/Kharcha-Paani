import React, { useEffect, useState } from 'react'

import HistoryCard from './HistoryCard'

function History() {
  const [historyData, setHistoryData] = useState([])

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_DOMAIN}/user/history`, {
          method: 'GET',
          credentials: 'include' // send cookies 
        });

        if (!response.ok) {
          throw new Error('Failed to fetch history');
        }

        const data = await response.json();
        setHistoryData(data.records);
        console.log("Got the history: ", data.records)
      } catch (err) {
        console.error('Error fetching history:', err);
      }
    };

    fetchHistory();
  }, []); 

  return (
    <div className='history-div'>
      <h1>Transaction History</h1>
      {historyData.length === 0 ? (
        <div className='no-history-msg'>
          <div className='no-history-icon'>📊</div>
          <h2>No Transaction History</h2>
          <p>Your transaction history will appear here once you start recording your money activities.</p>
        </div>
      ) : (
        historyData.map(dt => (
          <HistoryCard key={dt._id} data={dt} />
        ))
      )}
    </div>
  )
}

export default History