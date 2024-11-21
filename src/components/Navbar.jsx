import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4 text-white">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-xl font-bold">Language Educator</h1>
        <div>
          <Link to="/" className="mr-4">
            Home
          </Link>
          <Link to="/about" className="mr-4">
            About
          </Link>
          <Link to="/tutorials">Tutorials</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
