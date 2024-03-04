import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/HomeTrackerForm.css';
import './styles/TrackerForm.css';
import { TrackerContext } from '../contexts/TrackerProvider';

const TrackerForm = () => {
  const [username, setUsername] = useState('');

  const [ showing, setShowing ] = useState('inline');
  let { trackerData } = useContext(TrackerContext)
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    
    navigate(`/tracker/${username}`);
    if (trackerData?.data?.username !== username) {
      setShowing("inline");
     
    }
    
    
  };
  useEffect(() => {

      
      setShowing("none");

  }, [trackerData])

  useEffect(() => {

      
    setShowing("inline");

}, [])


  return (
    <div className="content text-light">
      <div className="centered-content">
        <h1 className="display-4 heading-yellow">Account Tracker</h1>
        <h2 className="lead">Get Useful Insight Into Your OSRS Account</h2>
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
              <button className="form-button" type="submit">
                Search
              </button>
              
            </div>
            
          </div>
          <img className="loading-icon" style={{display: showing}} src={require("../files/loading.gif")} alt="loading..."/>
        </form>
      </div>
    </div>
  );
};

export default TrackerForm;
