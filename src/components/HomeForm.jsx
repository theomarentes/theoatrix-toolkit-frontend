import React, {   useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/HomeTrackerForm.css';
import './styles/TrackerForm.css';
import "./styles/HomeForm.css"


const HomeForm = () => {
  const [username, setUsername] = useState('');

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault(); // Prevent the default form submission
    
    navigate(`/tracker/${username}`);

    
    
    
  };



  return (
    <div style={{paddingTop:"20vh", paddingBottom: "20vh"}} class="content">
      <div className="centered-content">
        <h1 className="display-4 heading-yellow">Theoatrix Toolkit</h1>
        <h2 className="lead">Master Old School RuneScape</h2>
        <form onSubmit={handleSearch}>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Your RuneScape Name"
              value={username}
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
