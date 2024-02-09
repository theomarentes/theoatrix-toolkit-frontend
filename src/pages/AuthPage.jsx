import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';
import Sidebar from '../components/Sidebar';
import "./styles/AuthPage.css"

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState(''); // Step 1: Add state for error message

  const handleLogin = async (email, password) => {
    try {
      const response = await fetch('https://theoatrix-toolkit-backend-139a9c3c7d4b.herokuapp.com/user/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
    
      const data = await response.json();
      if (response.ok) {
        console.log('Login successful:', data);
        console.log(data)
        localStorage.setItem('userToken', data.token);
        window.location.href = '/my-account';
      } else {
        throw new Error(data.message || 'Failed to login');
      }
    } catch (error) {
      console.error('Login error:', error.message);
      setErrorMessage(error.message); // Step 2: Set error message on catch
    }
  };

  const handleSignUp = async (email, password) => {
    try {
      const response = await fetch('https://theoatrix-toolkit-backend-139a9c3c7d4b.herokuapp.com/user/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Sign-up successful:', data);
        localStorage.setItem('userToken', data.token);
        window.location.href = '/my-account';
      } else {
        throw new Error(data.message || 'Failed to sign up');
      }
    } catch (error) {
      console.error('Sign-up error:', error.message);
      setErrorMessage(error.message); // Set error message on catch
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
