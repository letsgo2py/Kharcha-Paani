import React, { useState } from 'react'
import AccountSummary from './AccountSummary'
import TopGoalDisplay from './TopGoalDisplay'
import EditProfile from './EditProfile'

import Styles from './Styles/profile.module.css'

function Profile({user}) {
  const [updatedUser, setUpdatedUser] = useState(user);

  const handleProfileUpdate = (newUserData) => {
    setUpdatedUser(newUserData);
  };

  return (
    <div className={Styles.Container}>
        <div className={Styles.header}>
            <img src='/profile.png' alt="Profile"></img>
            <h1>{updatedUser.name}</h1>
            <p>Joined on {updatedUser.createdAt.slice(0, 10)}</p>
        </div>
        <div className={Styles.body}>
            <div className={Styles.profileSection}>
                <AccountSummary user={updatedUser} />
            </div>
            <div className={Styles.profileSection}>
                <TopGoalDisplay user={updatedUser} />
            </div>
            <div className={Styles.profileSection}>
                <EditProfile user={updatedUser} onProfileUpdate={handleProfileUpdate} />
            </div>
        </div>
    </div>
  )
}

export default Profile