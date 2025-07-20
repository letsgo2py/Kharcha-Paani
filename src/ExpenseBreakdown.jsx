import React from "react";
import {
  PieChart, Pie, Cell, ResponsiveContainer
} from "recharts";

const COLORS = ["#A0E7E5", "#B4F8C8", "#FBE7C6", "#FFAEBC", "#BDB2FF", '#964B00'];

const ExpenseBreakdown = ({ Data }) => {
  const expenseData = Data.filter(entry => entry.type === 'expense');

  const categoryMap = {};

  expenseData.forEach(entry => {
    const { category, amount } = entry;
    if (category in categoryMap) {
      categoryMap[category] += amount;
    } else {
      categoryMap[category] = amount;
    }
  });

  //Convert to array format suitable for recharts
  const chartData = Object.entries(categoryMap).map(([name, value]) => ({
    name,
    value
  }));

  
  return (
    <div className="card">
      <h3>Expense Breakdown</h3>
      <div className="expense-container">
        <div className="legend">
          {chartData.map((entry, index) => (
            <div key={index} className="legend-item">
              <span className="dot" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
              <span className="label">{entry.name}</span>
              <span className="amount">₹{entry.value}</span>
            </div>
          ))}
        </div>
        <ResponsiveContainer width={200} height={200}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
              fill="#8884d8"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpenseBreakdown;
