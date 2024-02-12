
import './styles/TrackerPage.css'
import Sidebar from '../components/Sidebar';

import "./styles/AllPages.css"

import SimulatorSearch from '../components/SimulatorSearch';


const SimulatorPage = () => {


  return (
    <div class="overlay">
          
        <Sidebar>
            <div class="page-container">
                <SimulatorSearch />
               
            </div>
        </Sidebar>
        
    </div>

  );
};

export default SimulatorPage;
