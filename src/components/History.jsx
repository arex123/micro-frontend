import React, { useState, useEffect } from "react";
import axios from "axios";

const History = () => {
  const [datetimes, setDatetimes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [loading,setLoading]=useState(false)
  const fetchData = async (page = 1) => {
    setLoading(true)
    
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
    setLoading(false)
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
      <h1 className="text-2xl mb-5 font-bold text-blue-400">Previous Datetime Table</h1>
      <table className="w-[80%]">
        <thead className="bg-gray-400">
          <tr className="">
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
              <td className="text-center text-gray-600">{datetime.year}</td>
              <td className="text-center text-gray-600">{datetime.month}</td>
              <td className="text-center text-gray-600">{datetime.date}</td>
              <td className="text-center text-gray-600">{datetime.hours}</td>
              <td className="text-center text-gray-600">{datetime.minutes}</td>
              <td className="text-center text-gray-600">{datetime.seconds}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex gap-10 my-10">
        <button
          className={`${(currentPage==1 || loading==true)?'bg-gray-100 cursor-not-allowed text-gray-400':''} bg-gray-300 p-2`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1 || loading==true}
        >
          Previous
        </button>
        <span className="bg-gray-300 p-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
        className={`${(currentPage==totalPages || loading==true)?'bg-gray-100 cursor-not-allowed':''} bg-gray-300 p-2`}
          onClick={() => handlePageChange(currentPage + 1)}
          // disabled={currentPage === totalPages || loading==true}
          // disabled={true}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default History;
