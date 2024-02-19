import React, {   useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/HomeTrackerForm.css';
import './styles/TrackerForm.css';
import "./styles/HomeForm.css"

function capitalizeFirstLetter(string) {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

const HomeForm = () => {
  const [item, setItem] = useState('');

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setItem(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault(); 
    
    navigate(`/grand-exchange/${capitalizeFirstLetter(item)}`);

    
    
    
  };



  return (
    <div class="content2 content content3">
      <div className="centered-content">
        <h1 className="display-4 heading-yellow">Grand Exchange</h1>
        <h2 className="lead">Find recent trade prices</h2>
        <form onSubmit={handleSearch}>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search for any item"
              value={item}
              onChange={handleInputChange}
            />
            <div className="input-group-append">
              <button className="btn btn-primary" type="submit">
                Search
              </button>
              
            </div>
            
          </div>
             </form>
      </div>
      </div>
  );
};

export default HomeForm;
