import React, { useContext, useState } from 'react';
import './styles/TrackerPage.css'
import Sidebar from '../components/Sidebar';
import TrackerForm from '../components/TrackerForm';
import "./styles/AllPages.css"
import TrackerDisplay from '../components/TrackerDisplay';
import { TrackerContext, TrackerDataProvider } from '../contexts/TrackerProvider';


const TrackerPage = () => {
  const { trackerData } = useContext(TrackerContext);
  const [loading, setLoading] = useState(false);


  return (
    <TrackerDataProvider>
      <div className="overlay">
        <Sidebar>
          <div className="page-container">
            <TrackerForm setLoading={setLoading} /> 
            <TrackerDisplay data={trackerData} loading={loading} /> 
          </div>
        </Sidebar>
      </div>
    </TrackerDataProvider>
  );
};

export default TrackerPage;
