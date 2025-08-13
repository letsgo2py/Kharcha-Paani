import React from 'react'

import Styles from './Styles/loader.module.css'

function Loader() {
  return (
    <div className={Styles['loader-div']}>
        <div className={Styles.loader}></div>
        <p>Wait...We are fetching your details</p>
    </div>
  )
}

export default Loader