import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./styles/GrandExchangeDisplay.css"

const ItemDetails = () => {
  const [itemData, setItemData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [backgroundImageUrls, setBackgroundImageUrls] = useState([]);
  const [topData, setTopData] = useState(null);
  
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



  useEffect(() => {
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
    


  useEffect(() => {
    const getTop10 = async () => {
      try {
        setLoading(true)
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
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    getTop10()
    
    
  }, [])

  const convertToMillion = (value) => {
    return (value / 1000000).toFixed(2) + 'M';
  };


  if (loading) {
    return <div>loading</div>
  }

if ((itemData).length > 0) {
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
}
  


  if (topData) {
    return (
      <>
        <h1>Top 10 Items</h1>

        <div className="top-10-container">
          {topData?.map(item => (
            <div className="top-10-item" key={item.item.id}>
              <div
                className="tooltip"
                style={{
                  backgroundImage: getBackgroundImageUrl(item.item.name, item.item.id)
                }}
              >
                <div className="tooltip-content">
                  <p>{item.item.examine}</p>
                  <p>Item id: {item.item.id}</p>
                </div>
              </div>
              <div><h3>{item.item.name}</h3></div>
              <div>Price: {convertToMillion(item.prices.high)}</div>

            </div>
          ))}
        </div>
      </>
    );
  }
  
  

  if (error) {
    return <div>Error: {error}</div>;
  }

  
};

export default ItemDetails;
