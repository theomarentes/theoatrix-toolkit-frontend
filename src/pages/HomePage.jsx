import React from 'react';
import './styles/HomePage.css'
import Sidebar from '../components/Sidebar';
import HomeForm from '../components/HomeForm';

const HomePage = () => {
  return (
    <Sidebar>
        <HomeForm/>
      </Sidebar>
  );
};

export default HomePage;
