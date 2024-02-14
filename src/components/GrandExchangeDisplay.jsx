import React, { useState, useEffect } from 'react';

const GrandExchangeComponent = ({ itemName }) => {
  const [itemDetails, setItemDetails] = useState(null);
  const [itemPrices, setItemPrices] = useState(null);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const itemDetailsResponse = await fetch(`/grand-exchange/${encodeURIComponent(itemName)}`);
        const itemDetailsData = await itemDetailsResponse.json();
        setItemDetails(itemDetailsData);

        if (itemDetailsData && itemDetailsData.id) {
          const itemPricesResponse = await fetch(`/grand-exchange/${itemDetailsData.id}`);
          const itemPricesData = await itemPricesResponse.json();
          setItemPrices(itemPricesData);
        }
      } catch (error) {
        console.error('Error fetching item details:', error);
      }
    };
  
    if (itemName) {
      fetchItemDetails();
    }
  }, [itemName]);

  return (
    <div className="grand-exchange-display">
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
