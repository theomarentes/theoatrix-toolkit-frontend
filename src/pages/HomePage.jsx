import React from 'react';
import './styles/HomePage.css'
import HomeForm from '../components/HomeForm';
import HomeNavBoxes from '../components/HomeNavBoxes';
import "./styles/AllPages.css"

const HomePage = () => {
  return (
    <>
    <div class="fullscreen-image">
        <div class="overlay">
        
            <HomeForm/>
            <HomeNavBoxes/>
        </div>  
    </div>
        
        </>
  );
};

export default HomePage;
