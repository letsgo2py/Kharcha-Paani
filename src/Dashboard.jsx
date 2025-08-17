import React from 'react'

import Cards from './Cards'
import Graphs from './Graphs'

function Dashboard({ User }) {
  if (!User) {
    return <div>Loading user...</div>;
  }
  return (
    <div className='dashboard'>
        <h2>Dashboard</h2>
        <Cards />
        <Graphs userId={User._id}/>
    </div>
  )
}

export default Dashboard