import React, { useState } from 'react';
import SimulatorDisplay from './SimulatorDisplay';
import "./styles/SimulatorSearch.css" 

const SimulatorSearch = () => {
  const [monsterName, setMonsterName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuantity,setSearchQuantity] = useState(100);
  const [quantity, setQuantity] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleInputChange2 = (event) => {
    setSearchQuantity(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setMonsterName(searchTerm);
    setQuantity(searchQuantity)
    // setShowing('block'); 
  };

  return (
    <div className="content text-light">
      <div className="centered-content" >
        <h1 className="display-4 heading-yellow">Drop Simulator</h1>
        <h2 className="lead">See what drops you'll get from certain bosses</h2>
        <form onSubmit={handleSearch} >
          <div className="row simulator-form" >
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Enter A Boss Name"
                value={searchTerm}
                onChange={handleInputChange}
              />
            </div>
            <div className="col">
              <input
                type="number"
                className="form-control"
                placeholder="Enter Quantity"
                value={searchQuantity}
                onChange={handleInputChange2}
              />
            </div>
            <div className="col-auto">
              <button className="btn btn-primary" type="submit">
                Simulate
              </button>
            </div>
          </div>
        </form>
        {monsterName ? (
          <SimulatorDisplay monsterName={monsterName} quantity={quantity}/>
        ) : (<div style={{marginTop: "20px"}}>e.g.  Zulrah  100 </div>)}
      </div>
    </div>
  );
};

export default SimulatorSearch;
