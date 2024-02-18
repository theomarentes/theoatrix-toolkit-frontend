import React, { useState } from 'react';

const GrandExchangeSearchForm = ({ onSearch }) => {
  const [itemName, setItemName] = useState('');

  const handleInputChange = (event) => {
    setItemName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(itemName);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter item name"
          value={itemName}
          onChange={handleInputChange}
        />
        <div className="input-group-append">
          <button className="btn btn-primary" type="submit">
            Search
          </button>
        </div>
      </div>
    </form>
  );
};

export default GrandExchangeSearchForm;
