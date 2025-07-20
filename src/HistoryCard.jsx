import React from 'react'

function HistoryCard({ data }) {
  return (
    <div className='history-card'>
        <div className='history-card-top'>
          <p className='hist-price'>₹{data.amount}</p>
          {data.takeFrom ? (
              <>
                <p className='takenText'>taken</p>
                <p>from --- <span className='nameText'>{data.takeFrom}</span></p>
              </>
            ) : (
              <>
                <p className='takenText'>paid</p>
                <p>to --- <span className='nameText'>{data.giveTo}</span></p>
              </>
            )
          }
        </div>
        {data.date && <p className='hist-date'>{data.date.slice(0, 10)}</p>}
      </div>
  )
}

export default HistoryCard