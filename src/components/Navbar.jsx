import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className=" bg-blue-400 text-white p-4 flex justify-end gap-5 text-xl">

        <Link to="/"> <div className="transition-all active:text-gray-500">Home</div></Link>
        <Link to="/history"> <div className="transition-all	active:text-gray-500">History</div></Link>
        
      </nav>
    </>
  );
};

export default Navbar;
