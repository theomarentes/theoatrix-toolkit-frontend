import React from 'react';
import GrandExchangeDisplay from '../components/GrandExchangeDisplay';
import Sidebar from '../components/Sidebar';
import GrandExchangeSearch from '../components/GrandExchangeSearch';

const GrandExchangePage = () => {
  return (
    <div class="overlay">
          
        <Sidebar>
            <div class="page-container">
                <GrandExchangeSearch />
                <GrandExchangeDisplay itemName="ItemNameHere" />
            </div>
      </ Sidebar> 
    </div>
  );
};

export default GrandExchangePage;