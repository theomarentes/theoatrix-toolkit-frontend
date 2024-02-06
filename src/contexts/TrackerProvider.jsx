
import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const TrackerContext = createContext([]);

export function TrackerDataProvider(props){

    let [trackerData, setTrackerData] = useState(null); 
    const { username } = useParams();
    useEffect( () => {
      const fetchUser = async () => {
          const data = await fetch("https://theoatrix-toolkit-backend-139a9c3c7d4b.herokuapp.com/tracker/"+username)
          const json = await data.json()
          setTrackerData(json)
      }
      fetchUser().catch(error => console.log(error));
      console.log(trackerData)
    }, [username])


	return(
		<TrackerContext.Provider value={{trackerData, setTrackerData}} >
			{props.children}
		</TrackerContext.Provider>
	)
}