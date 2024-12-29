import React, { useState, useEffect } from "react";
import axios from "axios";

const History = () => {
  const [datetimes, setDatetimes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const fetchData = async (page = 1) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URI}/datetimes?page=${page}&limit=20`
      );
      setDatetimes(response.data.datetimes);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
      setTotalCount(response.data.totalCount);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-10">
      <h1>Previous Datetime Table</h1>
      <table className="w-[80%]">
        <thead>
          <tr>
            <th>Year</th>
            <th>Month</th>
            <th>Date</th>
            <th>Hours</th>
            <th>Minutes</th>
            <th>Seconds</th>
          </tr>
        </thead>
        <tbody>
          {datetimes.map((datetime, index) => (
            <tr key={index}>
              <td>{datetime.year}</td>
              <td>{datetime.month}</td>
              <td>{datetime.date}</td>
              <td>{datetime.hours}</td>
              <td>{datetime.minutes}</td>
              <td>{datetime.seconds}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex gap-10 my-10">
        <button
          className="bg-gray-300 p-2"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="bg-gray-300 p-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
        className="bg-gray-300 p-2"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default History;
