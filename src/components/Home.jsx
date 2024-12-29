import React, { useEffect, useState } from "react";
import { AnalogClock } from "@hoseinh/react-analog-clock";
import axios from "axios";

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

  useEffect(()=>{
    fetchData()
  },[])

  console.log(rDate)

  return (
    <div className="w-full h-full flex items-center justify-center pt-28 flex-col">
      {/* <div className=""> */}
        <AnalogClock
          // staticDate={new Date(2024, 0, 1, 12, 15, 0)}
          staticDate={new Date(rDate?.year, rDate?.month - 1, rDate?.date, rDate?.hours, rDate?.minutes, rDate?.seconds)}
          showMinuteHand={true}
          showSecondHand={true}
          showBorder={true}
          showHandBase={true}
          smooth={false}
          whiteNumbers={false}
          square={false}
          numbersType="numbersAndLines"
          borderColor="#000000"
          handBaseColor="#000000"
          handColor={{ hour: "#000000", minute: "#000000", second: "#e74c3c" }}
          handLength={{ hour: "65px", minute: "90px", second: "90px" }}
          handThickness={{ hour: "2px", minute: "2px", second: "2px" }}
          size="200px"
          backgroundColor="#ffffff"
        />
      {/* </div> */}

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
