import React from 'react'

import Styles from './Styles/loader.module.css'

function Loader() {
  return (
    <div className={Styles['loader-div']}>
        <div className={Styles.loader}></div>
        <p>Hold Tight... Preparing some awesome stuff for you</p>
    </div>
  )
}

export default Loader