import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AccountSummary({ user }) {
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    netBalance: 0,
    transactionCount: 0,
    goalsCount: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccountSummary = async () => {
      try {
        // Fetch transactions to calculate summary
        const transactionsRes = await axios.get(
          `${import.meta.env.VITE_BACKEND_DOMAIN}/user/transactions`,
          { withCredentials: true }
        );

        // Fetch goals count
        const goalsRes = await axios.get(
          `${import.meta.env.VITE_BACKEND_DOMAIN}/user/goals`,
          { withCredentials: true }
        );

        const transactions = transactionsRes.data?.data || [];
        const goals = goalsRes.data?.data || [];

        // Calculate totals
        const totalIncome = transactions
          .filter(t => t.type === 'income')
          .reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0);

        const totalExpenses = transactions
          .filter(t => t.type === 'expense')
          .reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0);

        setSummary({
          totalIncome,
          totalExpenses,
          netBalance: totalIncome - totalExpenses,
          transactionCount: transactions.length,
          goalsCount: goals.length
        });
      } catch (error) {
        console.error('Error fetching account summary:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccountSummary();
  }, []);

  if (loading) {
    return (
      <div className="account-summary-container">
        <h3>Account Summary</h3>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="account-summary-container">
      <h3>Account Summary</h3>
      <div className="summary-stats">
        <div className="stat-item">
          <span className="stat-label">Total Income:</span>
          <span className="stat-value income">₹{summary.totalIncome.toFixed(2)}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Total Expenses:</span>
          <span className="stat-value expense">₹{summary.totalExpenses.toFixed(2)}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Net Balance:</span>
          <span className={`stat-value ${summary.netBalance >= 0 ? 'income' : 'expense'}`}>
            ₹{summary.netBalance.toFixed(2)}
          </span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Transactions:</span>
          <span className="stat-value">{summary.transactionCount}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Goals:</span>
          <span className="stat-value">{summary.goalsCount}</span>
        </div>
      </div>
    </div>
  );
}

export default AccountSummary;
