import React from 'react';
import './styles/HomePage.css'
import Sidebar from '../components/Sidebar';
import TrackerForm from '../components/TrackerForm';

const HomePage = () => {
  return (
    <Sidebar>
        <TrackerForm/>
      </Sidebar>
  );
};

export default HomePage;
