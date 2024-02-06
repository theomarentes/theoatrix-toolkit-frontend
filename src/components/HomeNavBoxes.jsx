import React, { useState } from 'react';
import "./styles/HomeNavBoxes.css"


const HomeNavBoxes = ({ children }) => {

  return (
    <>
      <div className="grid-container">
      <a href="/tracker" className="box">
        <img src={require("../files/Skills-icon.png")} className="icon" alt="Skills icon" />
        <p>Account Tracker</p>
      </a>
      <a href="/guides" className="box">
        <img src={require("../files/Construction-guide.png")} className="icon" alt="Construction guide" />
        <p>1-99 Guides</p>
      </a>
      <a href="/time-to-max" className="box">
        <img src={require("../files/Max_cape.png")} className="icon" alt="Max cape" />
        <p>Time To Max</p>
      </a>
      <a href="/high-alchemy" className="box">
        <img src={require("../files/High-Alchemy.png")} className="icon" alt="High Alchemy" />
        <p>High Alchemy</p>
      </a>
      <a href="/grand-exchange" className="box">
        <img src={require("../files/coins.png")} className="icon" alt="Coins" />
        <p>Grand Exchange</p>
      </a>
      <a href="/my-account" className="box">
        <img src={require("../files/junk-checker.png")} className="icon" alt="Junk checker" />
        <p>My Account</p>
      </a>
    </div>


    </>
  );
};

export default HomeNavBoxes;
