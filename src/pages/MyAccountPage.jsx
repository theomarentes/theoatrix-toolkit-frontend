

              import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom'; // Import useNavigate
import Sidebar from '../components/Sidebar';

function MyAccountPage() {
  const [userData, setUserData] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const token = localStorage.getItem('userToken');
  const navigate = useNavigate(); // Use the useNavigate hook

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('userToken'); // Clear the userToken from localStorage
    navigate('/login'); // Redirect to login page
  };

  useEffect(() => {
    if (token) {
      const fetchUserData = async () => {
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
      fetchUserData();
    }
  }, [token]);

  if (!token || token === "undefined") {
    return <Navigate to="/login"/>;
  } else {
    if (userData) {
        console.log(userData)
        return (
          <div className="overlay">
            <Sidebar>
              <div className="page-container">
                <h1>My Account</h1>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <p><b>Email:</b> {userData.user.email}</p>
                <button className="btn btn-primary" type="submit">
                Change Password
              </button>
                <button className="btn btn-primary" onClick={handleLogout}>
                  Logout
                </button>
                
              <div style={{margin:"50px"}}></div>
              <h3>Favourites {userData.user.favourites}</h3>
              {userData.user.favourites ? (
                (userData.user.favourites).map((element) => {
                    return(element)
                })
              ) : (
                <p>No Favourites</p>
              )}
                
              </div>
             
            </Sidebar>
          </div>
        );
    } else {
        return (
          <div className="overlay">
            <Sidebar>
              <div className="page-container">
                <p>Loading...</p>
              </div>
            </Sidebar>
          </div>
        );
    }
  }
}

export default MyAccountPage;
