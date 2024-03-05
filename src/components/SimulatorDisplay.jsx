import React, { useState, useEffect } from 'react';
import "./styles/Simulator.css"

// SimulatorDisplay Component: Displays monster data and loot for simulation.
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

// checkImage: Function to check if an image URL is valid.
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

// simulateDrops Function: Simulates drops based on provided drop data and kill count.
  function simulateDrops(drops, killCount) {
    let results = {};
    // Loop through each drop
    for (let i = 0; i < killCount; i++) {
      drops.forEach(drop => {
        // Roll for each drop's rarity
        for (let j = 0; j < drop.rolls; j++) {
          if (Math.random() <= drop.rarity) {
            let quantity = 0;
            // Calculate quantity based on provided value
            if (typeof drop.quantity === 'string' && drop.quantity.includes('-')) {
              let [min, max] = drop.quantity.split('-').map(Number);
              quantity = Math.floor(Math.random() * (max - min + 1)) + min;
            } else {
              quantity = parseInt(drop.quantity, 10);
            }

            // Update results object with the drop's information
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

// useEffect Hook: Fetches monster data when monsterName changes.
// useEffect Hook: Calculates loot when monsterData and quantity change.
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
// Call fetchMonsterData when monsterName changes
    if (monsterName) {
      fetchMonsterData();
    }
    
  }, [monsterName]);

  // Check if monsterData and quantity are available and calculate loot
  useEffect(() => {
    if (monsterData?.monster?.drops && quantity) {
      setLoot(simulateDrops(monsterData.monster.drops, quantity));
    }
  }, [monsterData, quantity]);
// Render error message if error is present
  if (error) {
    return <div>Error: {error}</div>;
  }
  
  return (
    <div>
      {loot && monsterData?.monster ? (
        <div>
          <h1>{monsterData.monster.name} x{quantity}</h1>
          <div className="loot-box">
            {Object.entries(loot).map(([key, { id, name, quantity }]) => (
              <div className="loot-box-image" style={{backgroundImage: getBackgroundImageUrl(name, id)}} key={id}>
                <span className="drop-quantity">
                  {quantity}
                </span>
                <span className="drop-item-text">{name}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        loading ? (<p>searching</p>) : (<p>Monster not found.</p>))}
    </div>
  );
      }

export default SimulatorDisplay;
