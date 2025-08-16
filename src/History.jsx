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
      <h1>History</h1>
      {historyData.length === 0 ? (
        <h1>No History.</h1>
      ) : (
        historyData.map(dt => (
          <HistoryCard key={dt._id} data={dt} />
        ))
      )}
    </div>
  )
}

export default History