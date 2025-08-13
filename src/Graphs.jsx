import React, { useEffect, useState, useMemo } from 'react'

import NetIncomeChart from './NetIncomeChart'
import ExpenseBreakdown from './ExpenseBreakdown'

import getData from './getGraphData'

function Graphs({ userId }) {

  // const [dataType, setDataType] = useState('30 days')
  // const [isEnoughData, setIsEnoughData] = useState(false);
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("Last 30 Days");
  const [haveData, setHaveData] = useState(false);
  

  useEffect(() => {
      fetch(`${import.meta.env.VITE_BACKEND_DOMAIN}/user/transaction-data`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',  // send the cookie
        body: JSON.stringify({ userId })
      })
      .then(async res => {
        const result = await res.json();
        setData(result.data || []); 
        setHaveData((result.data || []).length > 0);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error:', err);
        setLoading(false);
      });
    
  }, [userId])

 //If data and filter haven't changed, it just returns the previously computed value (cached).
  const filteredGraphData = useMemo(() => { 
    return getData(data, filter);
  }, [data, filter]);

  console.log("Filetr val: ", filter)

  // const graphDataAvailable = last30Days && last30Days.length >= 10; // minimum 10 entries for meaningful graph
  //const graphDataAvailable = true; // minimum 10 entries for meaningful graph

  return (
    <div className='graph-div'>
        <h2>Analysis</h2>
        <div className='graphs'>
          <div className="line-graph graph">
            {loading ? (
              <p>Loading...</p>
            ) : haveData ? (
              <NetIncomeChart data={filteredGraphData} filter={filter} setFilter={setFilter}/>
            ) : (
              <div className="line-no-data">
                <p>Not Enough Data For Graph</p>
                <p>(Use Atleast for 30 days)</p>
                <i className="bi bi-bar-chart-line"></i>
              </div>
            )}
          </div>
            
            <div className='pie-chart graph'>
                <ExpenseBreakdown Data={data}/>
            </div>
        </div>
    </div>
  )
}

export default Graphs