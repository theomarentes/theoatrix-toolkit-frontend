import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

function MyAccountPage() {
  const [userData, setUserData] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const token1 = localStorage.getItem('userToken');


  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('userToken');
      if (token) {
      try {
        const response = await fetch('https://theoatrix-toolkit-backend-139a9c3c7d4b.herokuapp.com/user/me', {
          headers: {
            'jwt': `${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setUserData(data);
        } else {
          throw new Error(data.message || 'Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error.message);
        setErrorMessage(error.message);
      }
    };
}
    fetchUserData();

  }, []);

  if (!token1 || token1 === "undefined") {
    return(
        <Navigate to="/login"/>
    )
    
  } else {
    if (userData) {
        console.log(userData)
        return (
      
                <div class="overlay">
          
          <Sidebar>
              <div class="page-container">
              <h1>My Account</h1>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              <p><b>Email:</b> {userData.user.email}</p>
              <button className="btn btn-primary" type="submit">
                Change Password
              </button>
              <div style={{margin:"50px"}}></div>
              <h3>Favourites {userData.user.favourites}</h3>
              {userData.user.favourites ? (
                (userData.user.favourites).map((element) => {
                    return({element})
                })
              ) : (
                <p>No Favourites</p>
              )}
                
              </div>
          </Sidebar>
          
      </div>
              
              
        
          );
    } else {
        return(<div class="overlay">
          
          <Sidebar>
              <div class="page-container"><p>loading...</p>
              
              </div>
          </Sidebar>
          
      </div>)
    }
    
  }
  
}

export default MyAccountPage;
