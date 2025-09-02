import React from 'react'

function HistoryCard({ data }) {
  const transactionType = data.takeFrom ? 'taken' : 'paid';
  const cardClass = `history-card ${transactionType === 'taken' ? 'taken-transaction' : 'paid-transaction'}`;
  
  return (
    <div className={cardClass}>
        <div className='history-card-top'>
          <div>
            <p className='hist-price'>₹{data.amount}</p>
          </div>
          <div>
            {data.takeFrom ? (
                <>
                  <p className='takenText taken-badge'>💰 taken</p>
                  <p>from <span className='nameText'>{data.takeFrom}</span></p>
                </>
              ) : (
                <>
                  <p className='takenText paid-badge'>💸 paid</p>
                  <p>to <span className='nameText'>{data.giveTo}</span></p>
                </>
              )
            }
          </div>
        </div>
        {data.date && <p className='hist-date'>📅 {data.date.slice(0, 10)}</p>}
      </div>
  )
}

export default HistoryCard