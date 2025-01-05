import React, { useEffect, useState } from "react";
import axios from "axios";
import Clock from 'react-simple-clock'

const Home = () => {

  const [rDate,setRDate]=useState()
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URI}/getRecent`
      );
      console.log("response ",response)
      setRDate(response.data)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // useEffect(()=>{
  //   fetchData()
  // },[])

  useEffect(() => {
    fetchData();

    // Connect to the SSE endpoint
    const eventSource = new EventSource(`${import.meta.env.VITE_SERVER_URI}/sse`);
    eventSource.onmessage = (event) => {
      console.log("30 ",event, event.data)
      const newData = JSON.parse(event.data);
      setRDate(newData); // Update state with new data
    };

    // Clean up the EventSource on component unmount
    return () => {
      eventSource.close();
    };
  }, []);


  console.log("date: ",rDate,rDate?.year, rDate?.month - 1, rDate?.date, rDate?.hours, rDate?.minutes, rDate?.seconds)

  const dynamicDate = rDate
  ? new Date(
      rDate.year,
      rDate.month - 1, // Month is 0-indexed in JavaScript Date
      rDate.date,
      rDate.hours,
      rDate.minutes,
      rDate.seconds
    )
  : null; // Fallback when rDate is not yet available

return (
  <div className="w-full h-full flex items-center justify-center pt-28 flex-col">
    {dynamicDate ? (
      // <AnalogClock
      //   staticDate={dynamicDate} // Clock updates dynamically when `dynamicDate` changes
      //   showMinuteHand={true}
      //   showSecondHand={true}
      //   showBorder={true}
      //   size="200px"
      //   backgroundColor="#ffffff"
      //   borderColor="#000000"
      //   handBaseColor="#000000"
      //   handColor={{ hour: "#000000", minute: "#000000", second: "#e74c3c" }}
      //   handLength={{ hour: "65px", minute: "90px", second: "90px" }}
      //   handThickness={{ hour: "2px", minute: "2px", second: "2px" }}
      // />
      <Clock hourValue={rDate.hours} minuteValue={rDate.minutes}  hourMarkFormat="number" />
    ) : (
      <p>Loading...</p> // Fallback UI while `dynamicDate` is not ready
    )}

      <div className="flex space-x-2 mt-10"> 
        <p className="bg-gray-400 p-2 rounded-md px-4">{rDate?.year}</p>
        <p className="bg-gray-400 p-2 rounded-md px-4">{rDate?.month}</p>
        <p className="bg-gray-400 p-2 rounded-md px-4">{rDate?.date}</p>
        <p className="bg-gray-400 p-2 rounded-md px-4">{rDate?.hours}</p>
        <p className="bg-gray-400 p-2 rounded-md px-4">{rDate?.minutes}</p>
        <p className="bg-gray-400 p-2 rounded-md px-4">{rDate?.seconds}</p>
      </div>
    </div>
  );
};

export default Home;
