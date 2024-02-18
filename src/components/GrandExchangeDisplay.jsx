import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./styles/Simulator.css"


const ItemDetails = () => {
  const [itemData, setItemData] = useState(null);
  const [topData, setTopData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // React Router hook to get URL parameters
  const { item } = useParams();

  
    const checkImage = (url) => {
      return fetch(url)
        .then(response => {
          if (response.ok) {
            return url; // Image exists
          }
          return false
        })
        .catch(error => {
          console.error(error);
          return null; // Image does not exist or other error
        });
    };
  
    const getBackgroundImageUrl = (name, id) => {
      
      if (checkImage(`https://oldschool.runescape.wiki/images/${name.replaceAll(" ", "_")}.png`) !== false) {
        return `url("https://oldschool.runescape.wiki/images/${name.replaceAll(" ", "_")}.png")`
      } else 
      if (checkImage(`https://www.osrsbox.com/osrsbox-db/items-icons/${id}.png`) !== false) {
        return `url("https://www.osrsbox.com/osrsbox-db/items-icons/${id}.png")`;
      } else {
        return `url("https://oldschool.runescape.wiki/images/Chaos_rune.png")`
      }
  
    };

    
    function convertToMillion(number) {
      if (number >= 1000000) {
          return `${(number / 1000000).toFixed(1)}m`;
      } else {
          return number.toString();
      }
    }
  


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
  }, [item]); 

  if (loading) {
    return (
      <>
        <h1>Top 10 Items</h1>
        
        {topData?.map(item => (
          <>
          <div style={{padding:"3%", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", maxWidth:"500px", alignContent:"center", margin:"auto", backgroundColor: "black0", borderRadius: "8px"}}>
            <div 
              className="tooltip" 
              style={{
                width: '50px',
                height: '50px',
                margin: '0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: "space-around",
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                backgroundImage: getBackgroundImageUrl(item.item.name, item.item.id)
              }} 
              key={item.item.id} // Use item ID as the key
            />
            <div><h3>{item.item.name}</h3></div>
            <div>Price: {convertToMillion(item.prices.high)}</div>
            </div>
          </>
        ))}
      </>
    );}
  

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {itemData ? (
        <div>
              <div className="tooltip" style={{
                width: '100px',
                height: '100px',
                
                margin: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: "space-around",
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                backgroundImage: getBackgroundImageUrl(itemData.item.name, itemData.item.id)
              }} key={itemData.item.name} />
               
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
