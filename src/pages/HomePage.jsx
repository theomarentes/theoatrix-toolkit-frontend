import React from 'react';
import './styles/HomePage.css'
import HomeForm from '../components/HomeForm';
import HomeNavBoxes from '../components/HomeNavBoxes';

const HomePage = () => {
  return (
    <div class="fullscreen-image">
        <HomeForm/>
        <HomeNavBoxes/>
        </div>
  );
};

export default HomePage;
