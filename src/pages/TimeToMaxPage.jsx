import React, { useContext } from 'react';
import './styles/TrackerPage.css'
import Sidebar from '../components/Sidebar';
import TimeToMaxDisplay from '../components/TimeToMaxDisplay';
import "./styles/AllPages.css"
import TimeToMaxForm from '../components/TimeToMaxForm';
import { TrackerContext, TrackerDataProvider } from '../contexts/TrackerProvider';


const TimeToMaxPage = () => {
    var {trackerData} = useContext(TrackerContext);


  return (
    <TrackerDataProvider>
    <div class="overlay">
          
        <Sidebar>
            <div class="page-container">
                <TimeToMaxForm />
                <TimeToMaxDisplay data={trackerData} />
            </div>
        </Sidebar>
        
    </div>
    </TrackerDataProvider>
  );
};

export default TimeToMaxPage;
