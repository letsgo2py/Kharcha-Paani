import React from 'react';

function TransactionsCard({ id, Amt, type, category, date, note }) {

  return (
    <div className="transaction-card">
      <p className="tr-money">Rs. {Amt}</p>
      <div>
        <p>{type}</p>
        <p className="tr-ctgory">{category}</p>
      </div>
      <p>Date: {date.slice(0, 10)}</p>
      {note && <p>NOTE: {note}</p>}
    </div>
  );
}

export default TransactionsCard;
