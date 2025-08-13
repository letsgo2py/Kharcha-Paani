import React from 'react';

import ThirtyDays from './Line_Plottings/ThirtyDays'

// const data = [
//   { month: 'Jan', income: 300000 },
//   { month: 'Feb', income: 350000 },
//   { month: 'Mar', income: 420000 },
//   { month: 'Apr', income: 80400 },
//   { month: 'May', income: 500000 },
//   { month: 'Jun', income: 550000 },
//   { month: 'Jul', income: 700000 },
//   { month: 'Aug', income: 600000 },
//   { month: 'Sep', income: 650000 },
//   { month: 'Oct', income: 720000 },
//   { month: 'Nov', income: 730000 },
//   { month: 'Dec', income: 750000 }
// ];

const NetIncomeChart = ({ data, filter, setFilter }) => {

  return (
    <div className="chart-card">
      <div className="chart-header">
        <h3>Net Income</h3>
        <select value={filter} onChange={e => setFilter(e.target.value)}>
          <option>Last 30 Days</option>
          <option>Last 6 months</option>
          <option>This year</option>
          <option>Last year</option>
        </select>
      </div>
      <ThirtyDays Data={data} filter={filter}/>
    </div>
  );
};

export default NetIncomeChart;
