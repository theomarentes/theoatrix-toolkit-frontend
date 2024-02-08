import React, { useContext } from 'react';
import './styles/TrackerDisplay.css';

import { TrackerContext } from '../contexts/TrackerProvider';



const TimeToMaxDisplay = ({ title = 'Theoatrix Toolkit' }) => {
    let { trackerData } = useContext(TrackerContext)
    
   
    if (trackerData && trackerData?.data?.displayName !== "undefined" && trackerData?.data?.latestSnapshot?.data?.bosses) {
        console.log(trackerData)

        return (
            <>

                <h1>{trackerData.data.displayName}</h1>
                <div class="container">

                    <div class="box">
                        <img src={require("../files/max-cape.png")} className="icon" alt="Coins" />
                        <p>{Math.round(trackerData.data.ttm)}</p>
                        <p style={{ fontSize: "60%" }}>Hours To Max</p>
                    </div>
                    <div class="box">
                        <img src={require("../files/Masori_assembler_max_cape.webp")} className="icon" alt="Coins" />
                        <p>{Math.round(trackerData.data.tt200m)}</p>
                        <p style={{ fontSize: "60%" }}>Hours To 200M All</p>
                    </div>
                    <div class="box">
                        <img src={require("../files/Skills-icon.png")} className="icon" alt="Coins" />
                        <p>{(Math.round(trackerData.data.ehp))}</p>
                        <p style={{ fontSize: "60%" }}>Skilling Hours</p>
                    </div>
                    <div class="box">
                        <img src={require("../files/Hybrid.png")} className="icon" alt="Coins" />
                        <p>{Math.round(trackerData.data.ehb)}</p>
                        <p style={{ fontSize: "60%" }}>Bossing Hours</p>
                    </div>
                </div>
                
            </>
        );
    } else if (trackerData && trackerData?.data?.displayName !== "undefined" && trackerData?.data?.displayName !== "null") {
        return(
            <>
            <p>Player not found, or data not found</p>
            <h1>{trackerData.data.displayName}</h1>
                <div class="container">

                    <div class="box">
                        <img src={require("../files/max-cape.png")} className="icon" alt="Coins" />
                        <p>?</p>
                        <p style={{ fontSize: "60%" }}>Hours To Max</p>
                    </div>
                    <div class="box">
                        <img src={require("../files/Masori_assembler_max_cape.webp")} className="icon" alt="Coins" />
                        <p>?</p>
                        <p style={{ fontSize: "60%" }}>Hours To 200M All</p>
                    </div>
                    <div class="box">
                        <img src={require("../files/Skills-icon.png")} className="icon" alt="Coins" />
                        <p>?</p>
                        <p style={{ fontSize: "60%" }}>Skilling Hours</p>
                    </div>
                    <div class="box">
                        <img src={require("../files/Hybrid.png")} className="icon" alt="Coins" />
                        <p>?</p>
                        <p style={{ fontSize: "60%" }}>Bossing Hours</p>
                    </div>
                </div>
                
            </>
   
        )
    } else {
        return(
            <>
            <p></p>
            <h1></h1>
                <div class="container">

                    <div class="box">
                        <img src={require("../files/max-cape.png")} className="icon" alt="Coins" />
                        <p>?</p>
                        <p style={{ fontSize: "60%" }}>Hours To Max</p>
                    </div>
                    <div class="box">
                        <img src={require("../files/Masori_assembler_max_cape.webp")} className="icon" alt="Coins" />
                        <p>?</p>
                        <p style={{ fontSize: "60%" }}>Hours To 200M All</p>
                    </div>
                    <div class="box">
                        <img src={require("../files/Skills-icon.png")} className="icon" alt="Coins" />
                        <p>?</p>
                        <p style={{ fontSize: "60%" }}>Skilling Hours</p>
                    </div>
                    <div class="box">
                        <img src={require("../files/Hybrid.png")} className="icon" alt="Coins" />
                        <p>?</p>
                        <p style={{ fontSize: "60%" }}>Bossing Hours</p>
                    </div>
                </div>
                
            </>
        )
    }
};

export default TimeToMaxDisplay;
