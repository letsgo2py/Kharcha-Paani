import React, { useState, useEffect } from 'react'
import axios from 'axios';

import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import './App.css'
import './index.css'
import 'bootstrap-icons/font/bootstrap-icons.css';

import Navbar from './Navbar'
import Dashboard from './Dashboard'
import Records from './Records'
import Footer from './Footer'
import FreshHome from './FreshHome'
import SignIn from './SignIn'
import Register from './Register'
import Goals from './Goals'
import History from './History'
import Profile from './Profile'
import Loader from './Loader';
import GoalForm from './GoalForm';

function App() {
  const location = useLocation();

  const [logged, setLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  // const [user, setUser] = useState(() => {
  //   const savedUser = localStorage.getItem("user");
  //   return savedUser ? JSON.parse(savedUser) : null;
  // });
  const [checkingAuth, setCheckingAuth] = useState(true);

  const navigate = useNavigate();

  const checkAuth = () => {
    return axios.get(`${import.meta.env.VITE_BACKEND_DOMAIN}/user/verify`, { withCredentials: true })
      .then((res) => {
        if(res.data.message === 'Not authenticated'){
          setUser(null)
          setLogged(false)
        }else{
          setUser(res.data.user); // or setAuthenticated(true)
          setUserId(res.data.user._id)
          setLogged(true)
        }
        setCheckingAuth(false);
      })
      .catch(() => {
        setUser(null);
        setCheckingAuth(false);
        setLogged(false)
      })
       .finally(() => {
        setCheckingAuth(false);
      });
    }

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (logged && location.pathname !== '/') {
      navigate('/');
    }
  }, [logged, location.pathname]);

  if (checkingAuth) return <Loader/>;
    
  return (
    <Routes>
      <Route path='/' element = {
        logged ? (<>
            <Navbar logged={true} setLogged={setLogged}/>
            <div className="container">
              <Dashboard User={user}/>
              <Records userId={userId}/>
              <Goals />
            </div>
            <Footer />
          </>) : (
            <FreshHome />
          )}
      />
      <Route path="/register" element={<Register setLogged={setLogged} FetchData={checkAuth}/>}/>
      <Route path="/login" element={<SignIn setLogged={setLogged} FetchData={checkAuth}/>}/>
      <Route path="/history" element={
        logged ? (
          <>
            <Navbar logged={true} setLogged={setLogged}/>
            <History userId={userId} />
          </>
        ) : (
          <FreshHome />
        )
      } />
      <Route path="/profile" element={
        logged ? (
          <>
            <Navbar logged={true} setLogged={setLogged}/>
            <Profile userId={userId} user={user}/>
          </>
        ) : (
          <FreshHome />
        )
      } />
      <Route path="/add-goal" element={<GoalForm/>}/>
    </Routes>
  )
  
}

export default App
