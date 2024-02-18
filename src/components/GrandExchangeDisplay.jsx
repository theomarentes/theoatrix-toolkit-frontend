import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./styles/GrandExchangeDisplay.css"

const ItemDetails = () => {
  const [itemData, setItemData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [backgroundImageUrls, setBackgroundImageUrls] = useState([]);

  // React Router hook to get URL parameters
  const { item } = useParams();
  
  const checkImage = async (url) => {
    try {
      const response = await fetch(url);
      return response.ok;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const fetchImageUrl = async (name, id) => {
    let imageUrl = "";
    if (await checkImage(`https://oldschool.runescape.wiki/images/${name.replaceAll(" ", "_")}.png`)) {
      imageUrl = `https://oldschool.runescape.wiki/images/${name.replaceAll(" ", "_")}.png`;
    } else if (await checkImage(`https://www.osrsbox.com/osrsbox-db/items-icons/${id}.png`)) {
      imageUrl = `https://www.osrsbox.com/osrsbox-db/items-icons/${id}.png`;
    } else {
      imageUrl = `https://oldschool.runescape.wiki/images/Chaos_rune.png`;
    }
    return imageUrl;
  };

  useEffect(() => {
    const fetchItemData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://theoatrix-toolkit-backend-139a9c3c7d4b.herokuapp.com/ge/item/${item}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }
        const data = await response.json();
        setItemData(prevItems => [data, ...prevItems]);
        const imageUrl = await fetchImageUrl(data.item.name, data.item.id); 
        setBackgroundImageUrls(prevUrls => [imageUrl, ...prevUrls]); 
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {itemData.map((item, index) => (
        <div className="item-details-container" key={index}>
          <div className="searched-item" style={{ backgroundImage: `url(${backgroundImageUrls[index]})` }}>
            <div className="image-overlay">
              <p>{item.item.examine}</p>
              <p>Item id: {item.item.id}</p>
            </div>
          </div>
          <div className="item-info">
            <h2>{item.item.name}</h2>
            <p>High {item.prices.high}</p>
            <p>Low {item.prices.low}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemDetails;
