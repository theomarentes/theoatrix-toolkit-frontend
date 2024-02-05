import React from 'react';
import './styles/HomeTrackerForm.css'
import './styles/TrackerForm.css'

const TrackerForm = () => {
  return (
      <div className="content text-light">
        <div className="centered-content">
          <h1 className="display-4 heading-yellow">Account Tracker</h1>
          <h2 className="lead">Get Useful Insight Into Your OSRS Account</h2>
          <form>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Your RuneScape Name"
              />
              <div className="input-group-append">
                <button className="btn btn-primary" type="button">
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
  );
};

export default TrackerForm;
