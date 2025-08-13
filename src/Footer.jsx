import React from 'react'

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <div className='footer'>
      <p>© {currentYear}. All rights reserved.</p>
      <p>Developed by Abhay Raj</p>
      <p>Made with ❤️</p>
    </div>
  )
}

export default Footer