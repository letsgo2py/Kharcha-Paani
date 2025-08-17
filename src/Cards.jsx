import React from 'react'

import BalanceCard from './BalanceCard'
import ExpenseCard from './ExpenseCard'
import TopGoalCard from './TopGoalCard'

function Cards() {
  return (
    <div className='cards'>
        <BalanceCard />
        <ExpenseCard />
        <TopGoalCard />
    </div>
  )
}

export default Cards