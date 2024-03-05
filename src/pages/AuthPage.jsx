import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';
import Sidebar from '../components/Sidebar';
import "./styles/AuthPage.css"

// AuthPage Function: Manages authentication processes including user login and sign-up.
function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState(''); 

  // handleLogin Function: Handles user login.
  const handleLogin = async (email, password) => {
    try {
      // Send a POST request to the backend for user login
      const response = await fetch('https://theoatrix-toolkit-backend-139a9c3c7d4b.herokuapp.com/user/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
    
      const data = await response.json();

      // If login is successful, save user token and redirect to account page
      if (response.ok) {
        console.log('Login successful:', data);
        console.log(data)
        localStorage.setItem('userToken', data.token);
        window.location.href = '/my-account';
      } else {
        // If login fails, set error message
        throw new Error(data.message || 'Failed to login');
      }
    } catch (error) {
      // Handle errors in login process
      console.error('Login error:', error.message);
      setErrorMessage(error.message); 
    }
  };

  // handleSignUp Function: Handles user sign-up.
  const handleSignUp = async (email, password) => {
    try {
      // Send a POST request to the backend for user sign-up
      const response = await fetch('https://theoatrix-toolkit-backend-139a9c3c7d4b.herokuapp.com/user/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      // If sign-up is successful, save user token and redirect to account page
      if (response.ok) {
        console.log('Sign-up successful:', data);
        localStorage.setItem('userToken', data.token);
        window.location.href = '/my-account';
      } else {
        // If sign-up fails, set error message
        throw new Error(data.message || 'Failed to sign up');
      }
    } catch (error) {
      // Handle errors in sign-up process
      console.error('Sign-up error:', error.message);
      setErrorMessage(error.message); 
    }
  };

  return (
    <div className="fullscreen-image">
      <div className="overlay">
        <Sidebar>
          <div className="content">
            {isLogin ? (
              <>
                <LoginForm onLogin={handleLogin} errorMessage={errorMessage} />
                <p>
                  Don't have an account? <button onClick={() => setIsLogin(false)}>Sign Up</button>
                </p>
              </>
            ) : (
              <>
                <SignUpForm onSignUp={handleSignUp} errorMessage={errorMessage} />
                <p>
                  Already have an account? <button onClick={() => setIsLogin(true)}>Login</button>
                </p>
              </>
            )}
          </div>
        </Sidebar>
      </div>
    </div>
  );
}

export default AuthPage;
