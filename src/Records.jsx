import React, { useState } from 'react'

import TakeMoney from './TakeMoney'
import GiveMoney from './GiveMoney'
import Transactions from './Transactions'

function Records({ userId }) {
  const [refreshFlag, setRefreshFlag] = useState(false);

  const handleRefresh = () => {
    setRefreshFlag(prev => !prev); 
  };

  return (
    <div className='records'>
        <h2>Transactions Records</h2>
        <Transactions userId={userId}/>
        <div className='records-body'>
          <TakeMoney userId={userId} refreshData={handleRefresh} refreshFlag={refreshFlag}/>
          <GiveMoney userId={userId} refreshData={handleRefresh} refreshFlag={refreshFlag}/>
        </div>
    </div>
  )
}

export default Records