import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function Navbar({logged, setLogged }) {
  const location = useLocation();
  const path = location.pathname;

  const navigate = useNavigate();
  const handleLogout = () => {
    fetch(`${import.meta.env.VITE_BACKEND_DOMAIN}/user/logout`, {
        method: 'POST',
        credentials: 'include' // ✅ Send the cookie along with the request
    })
    .then(async res => {
        const data = await res.json();
        setLogged(false);
        navigate('/'); 
    })
    .catch(err => console.error('Error:', err));
  }
  return (
    <div className='navbar'>
        <div className='logo'>
            <a href='/'>Kharcha Paani</a>  
        </div>
        {logged ? (
          <div>
              <Link to="/history">History</Link>  
              <a href='#' onClick={handleLogout}>Logout</a>  
              {/* <a href='#' >Profile</a> */}
              <Link to="/profile">Profile</Link>
          </div>
          ) : ( 
          <div>
            {
              path === '/register' ? (
                <Link to="/login">Sign In</Link>
              ) : path === '/login' ? (
                <Link to="/register">Register</Link>
              ) : (
                <>
                <Link to="/register">Register</Link>
                <Link to="/login">Sign In</Link>
                </>
              )
            }
          </div>
          )}
    </div>
  )
}

export default Navbar