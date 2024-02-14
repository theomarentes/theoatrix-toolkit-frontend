import React, { useState } from 'react';
import GrandExchangeForm from '../components/GrandExchangeForm'; 
import GrandExchangeDisplay from '../components/GrandExchangeDisplay'; 

const GrandExchangePage = () => {
  const [searchItem, setSearchItem] = useState('');

  const handleSearch = (itemName) => {
    setSearchItem(itemName);
  };

  return (
    <div className="grand-exchange-page">
      <GrandExchangeForm onSearch={handleSearch} />
      {searchItem && <GrandExchangeDisplay itemName={searchItem} />} 
    </div>
  );
};

export default GrandExchangePage;
