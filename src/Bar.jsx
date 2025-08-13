import React from 'react'

function Bar(props) {
    const price = props.price || 0;
    const Type = props.type || 'expense';
    const barPercent = props.percent;

    const TextClass = Type === 'Income' ? 'bold-text income-text' : 'bold-text expense-text';
    const BarClass = Type === 'Income' ? 'barStatus income-bar' : 'barStatus expense-bar';
    const barColor = Type === 'Income' ? '#3B82F6' : '#EA580C'; // blue or orange

    const barStyle = {
        width: `${barPercent}%`,
        height: '100%',
        backgroundColor: barColor,
        position: 'absolute',
        top: 0,
        left: 0,
        borderRadius: '20px',
        zIndex: 1,
    };

  return (
    <div className='bar-div'>
        <div className='barInfo'>
            <p className={TextClass}>Rs.{' '}{price}</p>
            <p className='subheading'>{Type}</p>
        </div>
        <div className={BarClass}>
            <div className= 'upperBarLayer' style={barStyle}></div>
        </div>
    </div>
  )
}

export default Bar