import React, { useEffect, useState } from 'react';

const GrandExchangeComponent = ({ itemName }) => {
  const [itemDetails, setItemDetails] = useState(null);
  const [itemPrices, setItemPrices] = useState(null);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await fetch(`/items/${itemName}`);
        const data = await response.json();
        setItemDetails(data);
      } catch (error) {
        console.error('Error fetching item details:', error);
      }
    };

    const fetchItemPrices = async () => {
      try {
        const response = await fetch(`/prices/${itemDetails._id}`);
        const data = await response.json();
        setItemPrices(data);
      } catch (error) {
        console.error('Error fetching item prices:', error);
      }
    };

    if (itemName) {
      fetchItemDetails();
    }
  }, [itemName]);

  return (
    <div className="grand-exchange-display">
      <h2>Grand Exchange Item: {itemName}</h2>
      {itemDetails && (
        <div className="item-details">
          <p>Name: {itemDetails.name}</p>
          <p>Examine: {itemDetails.examine}</p>
        </div>
      )}
      {itemPrices && (
        <div className="item-prices">
          <p>High Price: {itemPrices.high}</p>
          <p>Low Price: {itemPrices.low}</p>
        </div>
      )}
    </div>
  );
};

export default GrandExchangeComponent;
