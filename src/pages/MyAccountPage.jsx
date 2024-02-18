

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

  const handleRemoveFavourite = async (urlToRemove) => {
    const token = localStorage.getItem('userToken');
    // Assume you have an endpoint /remove-favourite to handle the removal
    try {
      const response = await fetch('https://theoatrix-toolkit-backend-139a9c3c7d4b.herokuapp.com/user/remove-favourite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'jwt': `${token}`,
        },
        body: JSON.stringify({ url: urlToRemove }),
      });
      if (response.ok) {
        // Remove the URL from userData state to update UI
        setUserData({
          ...userData,
          user: {
            ...userData.user,
            favourites: userData.user.favourites.filter(url => url !== urlToRemove)
          }
        });
        alert('Favourite removed successfully');
      } else {
        // Handle failure
        alert('Failed to remove favourite');
      }
    } catch (error) {
      console.error('Error removing favourite:', error);
      alert('Error removing favourite');
    }
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
          if (error.message === "Invalid JWT.") {
            localStorage.removeItem('userToken');
          }
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
                {/* <button className="btn btn-primary" >
                Change Password
              </button> */}
                <button className="btn btn-primary" onClick={handleLogout}>
                  Logout
                </button>
                
              <div style={{margin:"50px"}}></div>
              <h3>My Favourites</h3>
              {userData.user.favourites ? (
                userData.user.favourites.map((url, index) => (
                  <div key={index} style={{display: "flex", alignItems: "center", marginBottom: "10px", justifyContent: "center"}}>
                    <div style={{marginRight: "1vw"}}>{(url).replaceAll("%20", "-")}</div>
                    <a href={url} target="_blank" rel="noopener noreferrer" style={{marginRight: "10px", textDecoration: "none", color: "white" }}>View</a>
                    <button className="btn btn-primary" onClick={() => handleRemoveFavourite(url)}>Remove</button>
                  </div>
                ))
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
