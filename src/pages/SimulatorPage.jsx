import React, { useContext } from 'react';
import './styles/TrackerPage.css'
import Sidebar from '../components/Sidebar';
import TimeToMaxDisplay from '../components/TimeToMaxDisplay';
import "./styles/AllPages.css"
import TimeToMaxForm from '../components/TimeToMaxForm';
import SimulatorSearch from '../components/SimulatorSearch';
import SimulatorDisplay from '../components/SimulatorDisplay';


const SimulatorPage = () => {


  return (
    <div class="overlay">
          
        <Sidebar>
            <div class="page-container">
                <SimulatorSearch />
                <SimulatorDisplay/>
            </div>
        </Sidebar>
        
    </div>

  );
};

export default SimulatorPage;
