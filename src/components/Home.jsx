import React, { useEffect, useState } from "react";
import axios from "axios";
import Clock from "react-simple-clock";
import { Switch } from "antd";
import { Button } from "primereact/button";

const Home = () => {
  const [rDate, setRDate] = useState();

  const [state, setState] = useState(0);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URI}/getRecent`
      );
      console.log("response ", response);
      setRDate(response?.data);
      // setState(response?.data?.state)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const sendData = (newValue) => {
    axios.post(`${import.meta.env.VITE_SERVER_URI}/save`, { value: newValue })
      .then(() => setState(newValue))
      .catch((err) => console.error(err));
  };



  useEffect(() => {
    fetchData();

    axios.get(`${import.meta.env.VITE_SERVER_URI}/fetch`)
      .then((res) => setState(res.data.value))
      .catch((err) => console.error(err));

    // Connect to the SSE endpoint
    const eventSource = new EventSource(
      `${import.meta.env.VITE_SERVER_URI}/sse`
    );
    eventSource.onmessage = (event) => {
      console.log("30 ", event, event.data);
      const newData = JSON.parse(event.data);
      setRDate(newData); // Update state with new data
    };

    // Clean up the EventSource on component unmount
    return () => {
      eventSource.close();
    };
  }, []);


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
      {/* <div> */}
      {dynamicDate ? (
        <Clock
          hourValue={rDate.hours}
          minuteValue={rDate.minutes}
          hourMarkFormat="number"
        />
      ) : (
        <p>Loading...</p>
      )}

      <div className="flex space-x-2 mt-10">
        <p className="bg-gray-400 p-2 rounded-md px-4">{rDate?.year}</p>
        <p className="bg-gray-400 p-2 rounded-md px-4">{rDate?.month}</p>
        <p className="bg-gray-400 p-2 rounded-md px-4">{rDate?.date}</p>
        <p className="bg-gray-400 p-2 rounded-md px-4">{rDate?.hours}</p>
        <p className="bg-gray-400 p-2 rounded-md px-4">{rDate?.minutes}</p>
        <p className="bg-gray-400 p-2 rounded-md px-4">{rDate?.seconds}</p>
      </div>
      {/* </div> */}
      <div className="p-20 flex flex-col gap-5 items-center">
        <div className="">
          <input
            type="text"
            className="text-center p-2 text-xl border"
            name="state"
            id="state"
            disabled
            value={state}
          />
        </div>

        <div className="flex gap-10">
          <Button label="Primary" onClick={() => sendData(1)} />
          <Button
            label="Danger"
            severity="danger"
            onClick={() => sendData(0)}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
