import React from 'react'

import Styles from './Styles/profile.module.css'

function Profile({userId, user}) {
  return (
    <div className={Styles.Container}>
        <div className={Styles.header}>
            <img src='/profile.png'></img>
            <h1>{user.name}</h1>
            <p>Joined on {user.createdAt.slice(0, 10)}</p>
        </div>
        <div className={Styles.body}>
            <div>Account Summary</div>
            <div>Top Goal</div>
            <div>Edit Profile</div>
        </div>
    </div>
  )
}

export default Profile