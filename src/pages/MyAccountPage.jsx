import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

function MyAccountPage() {
  const [userEmail, setUserEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const token1 = localStorage.getItem('userToken');
  console.log(token1)

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('userToken');
      console.log(token)
      try {
        const response = await fetch('https://theoatrix-toolkit-backend-139a9c3c7d4b.herokuapp.com/user/me', {
          headers: {
            'jwt': `${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setUserEmail(data.email); // Assuming the response has an 'email' field
        } else {
          throw new Error(data.message || 'Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error.message);
        setErrorMessage(error.message);
      }
    };

    fetchUserData();
  }, []);

  if (token1 === "undefined") {
    return(
        <Navigate to="/login"/>
    )
    
  } else {
    return (
        <div>
          <h2>My Account</h2>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <p>Email: {userEmail}</p>
        </div>
      );
  }
  
}

export default MyAccountPage;
