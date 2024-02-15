import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';



const ItemDetails = () => {
  const [itemData, setItemData] = useState(null);
  const [topData, setTopData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // React Router hook to get URL parameters
  const { item } = useParams();

  useEffect(() => {

    const getTop10 = async () => {
      try {
        const response = await fetch(`https://theoatrix-toolkit-backend-139a9c3c7d4b.herokuapp.com/ge/top10`);
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }
        const data = await response.json();
        var sendData = []
        for (var item in data.items) {
          const response = await fetch(`https://theoatrix-toolkit-backend-139a9c3c7d4b.herokuapp.com/ge/item/${data.items[item].id}`);
          const data2 = await response.json();
          sendData = [...sendData, data2]
        }
        setTopData(sendData);
      } catch (error) {
        console.log(error)
      }
    }
    getTop10()
    
  }, [])

  useEffect(() => {
    const fetchItemData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://theoatrix-toolkit-backend-139a9c3c7d4b.herokuapp.com/ge/item/${item}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }
        const data = await response.json();
        setItemData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (item) {
      fetchItemData();
    }
  }, [item]); // Depend on 'item' to refetch when it changes

  if (loading) {
    return <div><h1>Top 10 Items</h1>{
    topData?.map(item => {
      console.log(item)
      return <div>{item.item.name} - Price: {item.prices.high}</div>
    })}</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {itemData ? (
        <div>
          <h2>Item: {itemData.item.name}</h2>
          <p>{itemData.item.examine}
          Item ID: {itemData.item.id}</p>
          <h3>High Price: {itemData.prices.high}</h3>
          <h3>Low Price: {itemData.prices.low}</h3>
        </div>
      ) : (
        <p>No data found for item: {item}</p>
      )}
    </div>
  );
};

export default ItemDetails;
