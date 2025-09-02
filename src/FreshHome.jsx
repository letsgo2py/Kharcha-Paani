import React from 'react'
import { useNavigate } from 'react-router-dom';


import Navbar from './Navbar'

import Styles from './Styles/freshhome.module.css'

function FreshHome() {
  const navigate = useNavigate();
    const handleLogin = () => {
        navigate('/login');
    }
  return (
    <div className = {Styles.Homepage}>
      <Navbar logged={false}/>
      <div className={Styles.container}>
          <h1 className={`${Styles.heading} text-[60px] lg:text-[80px]`}>Have Full Control On Your Money</h1>
          <div>
          <h3 className={Styles.subheading}>Manage your money at one place and let your worries go away.</h3>
          <h3 className={Styles.subheading}>Be Smart. Be more focused. Be more Productive.</h3>
          </div>
          <button className={Styles.Startbtn} onClick={handleLogin}>Get Started</button>
      </div>
    </div>
  )
}

export default FreshHome