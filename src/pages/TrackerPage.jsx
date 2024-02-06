import React, { useContext } from 'react';
import './styles/TrackerPage.css'
import Sidebar from '../components/Sidebar';
import TrackerForm from '../components/TrackerForm';
import "./styles/AllPages.css"
import TrackerDisplay from '../components/TrackerDisplay';
import { TrackerContext, TrackerDataProvider } from '../contexts/TrackerProvider';


const TrackerPage = () => {
    var {trackerData} = useContext(TrackerContext);


  return (
    <TrackerDataProvider>
    <div class="overlay">
          
        <Sidebar>
            <div class="page-container">
                <TrackerForm />
                <TrackerDisplay data={trackerData} />
            </div>
        </Sidebar>
        
    </div>
    </TrackerDataProvider>
  );
};

export default TrackerPage;
