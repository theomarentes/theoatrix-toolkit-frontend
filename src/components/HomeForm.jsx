import React from 'react';
import './styles/HomeTrackerForm.css'

const HomeForm = () => {
  return (
      <div className="content text-light">
        <div className="centered-content">
          <h1 className="display-4 heading-yellow">Theoatrix Toolkit</h1>
          <h2 className="lead">Master OldSchool RuneScape</h2>
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

export default HomeForm;
