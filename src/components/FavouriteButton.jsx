import React from 'react';

function FavouriteButton({ url, token }) {
  // Function to handle the click event
  const addToFavourites = async () => {
    try {
      const response = await fetch('https://theoatrix-toolkit-backend-139a9c3c7d4b.herokuapp.com/user/add-favourite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'jwt': `${token}`, // Adjust based on how your token is stored
        },
        body: JSON.stringify({ url }), // Send the URL in the request body
      });
      const data = await response.json();
      if (response.ok) {
        alert('Added to favourites successfully!');
      } else {
        alert(`Failed to add to favourites: ${data.message}`);
      }
    } catch (error) {
      console.error('Error adding to favourites:', error);
      alert('Error adding to favourites. Please try again.');
    }
  };

  return (
    <button className="btn btn-primary" onClick={addToFavourites}>Add to Favourites</button>
  );
}

export default FavouriteButton;
