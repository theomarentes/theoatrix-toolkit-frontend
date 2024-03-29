import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/HomeTrackerForm.css';
import './styles/TrackerForm.css';
import { TrackerContext } from '../contexts/TrackerProvider';

const TimeToMaxForm = () => {
  const [username, setUsername] = useState('');
  const [ showing, setShowing ] = useState('none');
  let { trackerData } = useContext(TrackerContext)
  const navigate = useNavigate();

// handleInputChange Function: Updates username state on input field changes.
  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

// handleSearch Function: Triggers search based on username input.
  const handleSearch = (event) => {
    event.preventDefault(); 
    navigate(`/time-to-max/${username}`);

    if (trackerData?.data?.username !== username) {
      setShowing("inline");
    }
    
    
  };
  useEffect(() => {

      setShowing("none");

  }, [trackerData])


  return (
<div className="content text-light">
      <div className="centered-content" >
        <h1 className="display-4 heading-yellow">Time To Max</h1>
        <h2 className="lead">Track Your Progress To Max</h2>
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
          <img style={{width:"40px", display: showing, animation:"ease-in", margin:"auto"}} src={require("../files/loading.gif")} alt="loading..."/>
        </form>
      </div>
      </div>
  );
};

export default TimeToMaxForm;
