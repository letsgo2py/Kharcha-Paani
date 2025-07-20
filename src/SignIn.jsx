import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import Navbar from './Navbar';
import Styles from './Styles/signin.module.css'


import { auth, provider, signInWithPopup } from './firebase'; // adjust path as needed

function SignIn({setLogged, FetchData}) {
    const [Incorrect, setIncorrect] = useState(false);
    const [serverErr, SetserverErr] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault(); // prevent form reload
        const form = e.target;
        const user = {
            email: form.email.value,
            password: form.password.value
        }

        fetch(`${import.meta.env.VITE_BACKEND_DOMAIN}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
            credentials: 'include'  // store the cookie
        })
        .then(async res => {
            const data = await res.json();
            // localStorage.setItem("user", JSON.stringify(user));  No need as of now
            if(data.error){
                setIncorrect(true);
            }else{
                setLogged(true);
                FetchData().then(() => {
                    navigate('/');
                });
            }  
        })
        .catch(err => {
            console.error('Error:', err)
            SetserverErr(true);

        });
    };

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            const userFromGoogle = {
                email: user.email,
                password: user.uid // using UID as a generated password
            }

            fetch(`${import.meta.env.VITE_BACKEND_DOMAIN}/auth/login`, {
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
                    FetchData().then(() => {
                        navigate('/');
                    });
                } else{
                    console.log("error Found")
                    setIncorrect(true);
                } 
            })
            .catch(err => {
                console.error('Error:', err)
                SetserverErr(true);

            });
        })
        .catch((error) => {
            console.error('Google sign-in error:', error);
            SetserverErr(true);
        });
    };
    
  return (
    <div className={Styles.bgColor}>
        <Navbar logged={false} />
        <div className={Styles.container}>
            <h1 className={Styles.topHeader}>Sign-in</h1>
            {Incorrect && 
                <div className={Styles.dupError}>
                    <p>Email or Password is Incorrect. Try Again.</p>
                    <p className={Styles.closeErr} onClick={() => {setIncorrect(false)}}>x</p>
                </div>
            }
            {serverErr && 
                <div className={Styles.dupError}>
                    <p>Server Error</p>
                    <p className={Styles.closeErr} onClick={() => {SetserverErr(false)}}>x</p>
                </div>
            }
            <div className={Styles.gglsignDiv} onClick={handleGoogleSignIn}>
                <p className={Styles.googleSign}>Login with Google</p>
                <img className={Styles.googleLogo} src='/google-logo.png'/>
            </div>
            <form onSubmit={handleSubmit} className={Styles.signIn}>
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

export default SignIn