import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';

function ThirtyDays({ Data, filter }) {
  // Determine which data key to use for X-axis
  const isDaily = filter === 'Last 30 Days';
  const isMonthly = ['Last 6 months', 'This year', 'Last year'].includes(filter);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={Data}>
        <CartesianGrid strokeDasharray="3 3" />

        {isDaily && (
          <XAxis
            dataKey="date"
            tickFormatter={(str) => {
              const date = new Date(str);
              return `${date.getDate()}/${date.getMonth() + 1}`;
            }}
          />
        )}

        {isMonthly && (
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12 }}
          />
        )}

        <YAxis
          tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
        />

        <Tooltip
          labelFormatter={(label) => {
            if (isDaily) {
              const date = new Date(label);
              return `Date: ${date.getDate()}/${date.getMonth() + 1}`;
            }
            return `Month: ${label}`;
          }}
          formatter={(value) => `₹${value.toLocaleString()}`}
        />

        <Line
          type="monotone"
          dataKey="income"
          stroke="#2563EB"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default ThirtyDays;
