import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import Navbar from './Navbar';  

import Styles from './Styles/signin.module.css'

import { auth, provider, signInWithPopup } from './firebase'; // adjust path as needed

function Register({setLogged, FetchData}) {
    const [dupError, setDupError] = useState(false);
    const [serverErr, SetserverErr] = useState(false);
    
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault(); 
        const form = e.target;
        const user = {
            name: form.name.value,
            email: form.email.value,
            password: form.password.value
        }

        fetch(`${import.meta.env.VITE_BACKEND_DOMAIN}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(async res => {
            const data = await res.json();
            if (!res.ok) {
                // Show error only if it's a duplicate or server error
                if (res.status === 409) {
                    setDupError(true);
                } else {
                    console.error('Other server error:', data.error);
                }
            } else {
                setDupError(false);
                setLogged(true);
                FetchData();
                navigate('/');
            }
        })
        .catch(err => {
            console.error('Error:', err)
            SetserverErr(true);
        });
    }

    const handleGoogleSignUp = () => {
        signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            const userFromGoogle = {
                name: user.displayName,
                email: user.email,
                password: user.uid // using UID as a generated password
            }

            fetch(`${import.meta.env.VITE_BACKEND_DOMAIN}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userFromGoogle),
                credentials: 'include'  // store the cookie
            })
            .then(async res => {
                const data = await res.json();
                if(res.ok){
                    setLogged(true);
                    FetchData();
                    navigate('/');
                } else{
                    console.log("error Found")
                } 
            })
            .catch(err => {
                console.error('Error:', err)
                SetserverErr(true);
            });
        })
        .catch((error) => {
            console.error('Google sign-up error:', error);
            SetserverErr(true);
        });
    };

  return (
    <div className={Styles.bgColor}>
        <Navbar logged={false}/>
        <div className={Styles.container}>
            <h1 className={Styles.topHeader}>Register</h1>
            {dupError && (
                <div className={Styles.dupError}>
                    <p>The user already exist. Try Login again.</p>
                    <p className={Styles.closeErr} onClick={() => {setDupError(false)}}>x</p>
                </div>
            )}
            {serverErr && (
                <div className={Styles.dupError}>
                    <p>Server Error</p>
                    <p className={Styles.closeErr} onClick={() => {SetserverErr(false)}}>x</p>
                </div>
            )}
            <div className={Styles.gglsignDiv} onClick={handleGoogleSignUp}>
                <p className={Styles.googleSign}>Login with Google</p>
                <img className={Styles.googleLogo} src='/google-logo.png'/>
            </div>
            <form onSubmit={handleSubmit} className={Styles.signIn}>
                <label>
                    Name:
                    <input type="text" name="name" required />
                </label>
                <label> 
                    Email Address:
                    <input type="email" name="email" required />
                </label>
                <label>
                    Password:
                    <input type="password" name="password" required />
                </label>
                <input className={Styles.Btn} type="submit" value="Submit" />
            </form>
        </div>
    </div>
  )
}

export default Register