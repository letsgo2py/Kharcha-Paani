import React from 'react'

import BalanceCard from './BalanceCard'
import ExpenseCard from './ExpenseCard'
import TopGoalCard from './TopGoalCard'

function Cards({ User }) {
  return (
    <div className='cards'>
        <BalanceCard User={User}/>
        <ExpenseCard />
        <TopGoalCard />
    </div>
  )
}

export default Cards