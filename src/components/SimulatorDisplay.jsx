import React, { useState, useEffect } from 'react';
import "./styles/Simulator.css"

const SimulatorDisplay = ({ monsterName, quantity }) => {
  const [monsterData, setMonsterData] = useState(null);
  const [loot, setLoot] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false)
  
  const checkImage = (url) => {
    return fetch(url)
      .then(response => {
        if (response.ok) {
          return url; 
        }
        return false
      })
      .catch(error => {
        console.error(error);
        return null; 
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


  function simulateDrops(drops, killCount) {
    let results = {};

    for (let i = 0; i < killCount; i++) {
      drops.forEach(drop => {
        for (let j = 0; j < drop.rolls; j++) {
          if (Math.random() <= drop.rarity) {
            let quantity = 0;
            if (typeof drop.quantity === 'string' && drop.quantity.includes('-')) {
              let [min, max] = drop.quantity.split('-').map(Number);
              quantity = Math.floor(Math.random() * (max - min + 1)) + min;
            } else {
              quantity = parseInt(drop.quantity, 10);
            }

            if (results[drop.id]) {
              results[drop.id].quantity += quantity;
            } else {
              results[drop.id] = {
                id: drop.id,
                name: drop.name,
                quantity: quantity
              };
            }
          }
        }
      });
    }

    return results;
  }

  useEffect(() => {
    const fetchMonsterData = async () => {
      try {
        setLoading(true)
        const response = await fetch(`https://theoatrix-toolkit-backend-139a9c3c7d4b.herokuapp.com/simulator/${encodeURIComponent(monsterName)}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }
        const data = await response.json();
        setMonsterData(data);
        setLoading(false)
      } catch (err) {
        setError(err.message);
        setLoot(null)
        setLoading(false)
      }
    };

    if (monsterName) {
      fetchMonsterData();
    }
    
  }, [monsterName]);

  useEffect(() => {
    if (monsterData?.monster?.drops && quantity) {
      setLoot(simulateDrops(monsterData.monster.drops, quantity));
    }
  }, [monsterData, quantity]);

  if (error) {
    return <div>Error: {error}</div>;
  }
  
  return (
    <div>
      {loot && monsterData?.monster ? (
        <div>
          <h1>{monsterData.monster.name} x{quantity}</h1>
          <div style={{ display: 'flex', flexWrap: 'wrap', background: "black", borderRadius: "25px" }}>
            {Object.entries(loot).map(([key, { id, name, quantity }]) => (
              <div className="tooltip" style={{
                width: '60px',
                height: '60px',
                position: 'relative',
                margin: '5px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundSize: 'cover',
                backgroundImage: getBackgroundImageUrl(name, id)
              }} key={id}>
                <span style={{
                  color: 'white',
                  fontWeight: 'bold',
                  textShadow: '1px 1px 2px black',
                  position: 'absolute'
                }}>
                  {quantity}
                </span>
                <span className="tooltiptext">{name}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        loading ? (<p>searching</p>) : (<p>Monster not found.</p>))}
    </div>
  );
      };  

export default SimulatorDisplay;
