import React from 'react';
import './styles/TrackerPage.css'
import Sidebar from '../components/Sidebar';
import TrackerForm from '../components/TrackerForm';

const TrackerPage = () => {
  return (
    <Sidebar>
        <TrackerForm/>
    </Sidebar>
  );
};

export default TrackerPage;
