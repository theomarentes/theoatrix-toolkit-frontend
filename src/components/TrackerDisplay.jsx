import React, { useContext } from 'react';
import './styles/TrackerDisplay.css';

import { TrackerContext } from '../contexts/TrackerProvider';

function capitalizeFirstLetter(string) {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const TrackerDisplay = ({ title = 'Theoatrix Toolkit' }) => {
    let { trackerData } = useContext(TrackerContext)


    if (trackerData && trackerData?.data?.displayName !== "undefined" && trackerData?.data?.latestSnapshot?.data?.bosses) {


        return (
            <>

                <h1>{trackerData.data.displayName}</h1>
                <h3>{capitalizeFirstLetter(trackerData.data.type)}</h3>
                <div class="container">

                    <div class="box">
                        <img src={require("../files/Combat_icon.webp")} className="icon" alt="Coins" />
                        <p>{(trackerData.data.combatLevel)}</p>
                        <p style={{ fontSize: "60%" }}>Combat Level</p>
                    </div>
                    <div class="box">
                        <img src={require("../files/Skills-icon.png")} className="icon" alt="Coins" />
                        <p>{(trackerData.data.latestSnapshot.data.skills.overall.level)}</p>
                        <p style={{ fontSize: "60%" }}>Total Level</p>
                    </div>
                    <div class="box">
                        <img src={require("../files/Tangleroot.webp")} className="icon" alt="Coins" />
                        <p>{(Math.round(trackerData.data.ehp))}</p>
                        <p style={{ fontSize: "60%" }}>Skilling Hours</p>
                    </div>
                    <div class="box">
                        <img src={require("../files/Olmlet.webp")} className="icon" alt="Coins" />
                        <p>{Math.round(trackerData.data.ehb)}</p>
                        <p style={{ fontSize: "60%" }}>Bossing Hours</p>
                    </div>
                </div>

                <div className="stats-box">
                    <h3>Progress To 99</h3>
                    {Object.values(trackerData.data.latestSnapshot.data.skills).map((element, index) => (
                        <div className="skill-info" key={index}>
                        <img className="skill-icon" alt={element.metric} src={require(`../files/skills/${capitalizeFirstLetter(element.metric)}_icon.webp`)} />
                        <div className="skill-name">
                            <p>{capitalizeFirstLetter(element.metric)}</p>
                        </div>
                        <progress className="progress-bar" value={element.experience} max={13034431}></progress>
                        <div className="level-value">
                            <p>{element.level}</p>
                        </div>
                        </div>
                    ))}
                </div>

                <div class="bossing-box">
                    {console.log(trackerData.data.latestSnapshot.data)}
                    <h3>Bossing Kills</h3>
                    {Object.values(trackerData.data.latestSnapshot.data.bosses).map((element) => {
                        if (element.kills === -1) {
                            element.kills = 0
                        }
                        return (
                            <div class="boss-info">
                                <img class="boss-icon" alt={element.metric} src={require("../files/bosses/"+(element.metric)+".png")}></img> 
                                <p class="bossing-metric">{capitalizeFirstLetter(element.metric).replaceAll("_", " ")}</p>
                                <p>{(element.kills)} kills</p>
                            </div>
                        )
                    })}
                </div>
                
                <div class="activities-box">
                    {console.log(trackerData.data.latestSnapshot.data)}
                    <h3>Activities</h3>
                    {Object.values(trackerData.data.latestSnapshot.data.activities).map((element) => {
                        if (element.score === -1) {
                            element.score = 0
                        }
                        return (
                            <div class="activities-info">
                                <img class="activities-icon" alt={element.metric} src={require("../files/activities/"+(element.metric)+".png")}></img> 
                                <p class="activities-metric">{capitalizeFirstLetter(element.metric).replaceAll("_", " ")}</p>
                                <p>{(element.score)}</p>
                            </div>
                        )
                    })}
                </div>
            </>
        );
    } else if (trackerData && trackerData?.data?.displayName !== "undefined" && trackerData?.data?.displayName !== "null") {
        return(
            <>
            <p>Player not found, or data not found</p>
            </>
        )
    } else {
        return ""
    }
};

export default TrackerDisplay;
