import React, { useState, useEffect } from 'react';

const SimulatorDisplay = ({ monsterName , quantity}) => {
  const [monsterData, setMonsterData] = useState(null);
  const [loot, setLoot] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  function simulateDrops(drops, killCount) {
    let results = {};
  
    for (let i = 0; i < killCount; i++) {
      drops.forEach(drop => {
        for (let j = 0; j < drop.rolls; j++) {
          if (Math.random() <= drop.rarity) {
            let quantity = 0;
            if (typeof drop.quantity === 'string' && drop.quantity.includes('-')) {
              // If quantity is a range, calculate a random number within that range
              let [min, max] = drop.quantity.split('-').map(Number);
              quantity = Math.floor(Math.random() * (max - min + 1)) + min;
            } else {
              // If quantity is a single number, parse it as integer
              quantity = parseInt(drop.quantity, 10);
            }
  
            // Add to results, combining quantities for duplicates
            if (results[drop.name]) {
              results[drop.name] += quantity;
            } else {
              results[drop.name] = quantity;
            }
          }
        }
      });
    }
  
    return results;
  }
  

  useEffect(() => {
    const fetchMonsterData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`https://theoatrix-toolkit-backend-139a9c3c7d4b.herokuapp.com/simulator/${encodeURIComponent(monsterName)}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }
        const data = await response.json();
        setMonsterData(data);
        
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (monsterName) {
      fetchMonsterData();
      
    }
  }, [monsterName]);

  useEffect(() => {
    // This useEffect depends on monsterData and will run after monsterData is updated
    if (monsterData?.monster?.drops && quantity) {
      setLoot(simulateDrops(monsterData.monster.drops, quantity));
    }
  }, [monsterData, quantity]); 

  if (isLoading) {
    return <div>loading</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {monsterData?.monster ? (
        <div>
          <h2>{monsterData.monster.name}</h2>
          {/* Display your monster data here. Example: */}
          <p>Quantity: {quantity}</p>
          {loot && typeof loot === 'object' && Object.entries(loot).map(([name, quantity]) => (
        <div key={name}>{`${name}: ${quantity}`}</div>
      ))}
        </div>
      ) : (
        <p>No data found for monster: {monsterName}</p>
      )}
    </div>
  );
};

export default SimulatorDisplay;
