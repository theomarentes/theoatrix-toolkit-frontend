import React, { useState } from 'react';
import SimulatorDisplay from './SimulatorDisplay'; // Adjust the import path as necessary

const SimulatorSearch = () => {
  const [monsterName, setMonsterName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuantity,setSearchQuantity] = useState(100);
  const [quantity, setQuantity] = useState('');
  const [showing, setShowing] = useState('none'); // To control the display of the loading image

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleInputChange2 = (event) => {
    setSearchQuantity(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setMonsterName(searchTerm);
    setQuantity(searchQuantity) // Update the monsterName state to trigger the search in SimulatorDisplay
    // setShowing('block'); // Show loading gif
  };

  return (
    <div className="content text-light">
      <div className="centered-content" style={{paddingTop:"20vh"}}>
        <h1 className="display-4 heading-yellow">Drop Simulator</h1>
        <h2 className="lead">See what drops you'll get from certain bosses</h2>
        <form onSubmit={handleSearch}>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter A Boss Name"
              value={searchTerm}
              onChange={handleInputChange}
            />
            <input
              type="number"
              className="form-control"
              placeholder="Enter Quantity"
              value={searchQuantity}
              onChange={handleInputChange2}
            />
            <div className="input-group-append">
              <button className="btn btn-primary" type="submit">
                Simulate
              </button>
            </div>
          </div>
          
           </form>
        {/* Render SimulatorDisplay with the current monsterName */}
        {monsterName && (
          <SimulatorDisplay monsterName={monsterName} quantity={quantity}/>
        )}
      </div>
    </div>
  );
};

export default SimulatorSearch;
