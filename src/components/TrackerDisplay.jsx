import React, { useState, useEffect, useContext } from 'react';
import './styles/TrackerDisplay.css';
import { useParams } from 'react-router-dom';
import { TrackerContext } from '../contexts/TrackerProvider';

function capitalizeFirstLetter(string) {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const TrackerDisplay = ({ title = 'Theoatrix Toolkit' }) => {
    let { trackerData } = useContext(TrackerContext)

    if (trackerData) {

    
    return (
        <>
        <h1>{trackerData.data.displayName}</h1>
            <p style={{ background: "black", width: "100%" }}>{trackerData.data.id}</p>
            <div class="container">
                <div class="box">
                    <img src={require("../files/coins.png")} className="icon" alt="Coins" />
                    <p>{capitalizeFirstLetter(trackerData.data.build)}</p>
                    <p style={{ fontSize: "60%" }}>Account Build</p>
                </div>
                <div class="box">
                    <img src={require("../files/coins.png")} className="icon" alt="Coins" />
                    <p>{(trackerData.data.combatLevel)}</p>
                    <p style={{ fontSize: "60%" }}>Combat Level</p>
                </div>
                <div class="box">
                    <img src={require("../files/coins.png")} className="icon" alt="Coins" />
                    <p>{(trackerData.data.latestSnapshot.data.skills.overall.level)}</p>
                    <p style={{ fontSize: "60%" }}>Total Level</p>
                </div>
                <div class="box">
                    <img src={require("../files/coins.png")} className="icon" alt="Coins" />
                    <p>{(Math.round(trackerData.data.ehp))}</p>
                    <p style={{ fontSize: "60%" }}>Efficient Hours</p>
                </div>
            </div>
            <div class="stats-box">
                {Object.values(trackerData.data.latestSnapshot.data.skills).map((element) =>{
                   return(
                        <div class="skill-info">
                            <p>{capitalizeFirstLetter(element.metric)}</p>
                            <progress class="progress-bar" id="file" value={element.experience} max="13034431"> {element.experience/13034431} </progress>
                            <p>{(element.level)}</p>
                        </div>
                    )
                })}
            </div>
        </>
    );
    }else {
        return "loading"
    }
};

export default TrackerDisplay;
