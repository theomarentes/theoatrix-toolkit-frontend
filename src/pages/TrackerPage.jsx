import React from 'react';
import './styles/TrackerPage.css'
import Sidebar from '../components/Sidebar';
import TrackerForm from '../components/TrackerForm';
import "./styles/AllPages.css"
import TrackerDisplay from '../components/TrackerDisplay';


const TrackerPage = () => {
  return (
    <div class="overlay">
        <Sidebar>
            <div class="page-container">
            <TrackerForm/>
            <TrackerDisplay />
            </div>
        </Sidebar>
    </div>
  );
};

export default TrackerPage;
