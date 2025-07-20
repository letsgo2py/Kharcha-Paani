import React from 'react'

import BalanceCard from './BalanceCard'
import ExpenseCard from './ExpenseCard'
import GoalCard from './GoalCard'

function Cards({ User }) {
  return (
    <div className='cards'>
        <BalanceCard User={User}/>
        <ExpenseCard />
        <GoalCard />
    </div>
  )
}

export default Cards