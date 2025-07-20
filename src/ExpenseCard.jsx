import React from 'react'

import Bar from './Bar'

function ExpenseCard() {
  return (
    <div className='expense-card card'>
        <div className='expense-card-header'>
            <p className='card-header'>Income & Expense</p>
            <div className='expense-dropdown'>
                <p>Last 30 days</p>
            </div>
        </div>
        <div className='expense-card-body'>
            <p className='expense-card-income'>Rs. 1600</p>
            <p className='subheading'>Net Income for last 30 days</p>
            <Bar price='110' type='Income' percent={80}/>
            <Bar price='20' type='Expense' percent={20}/>
        </div>
    </div>
  )
}

export default ExpenseCard