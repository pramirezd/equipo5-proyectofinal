import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const AdminNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative flex justify-end z-50">
      {" "}
      {/* Asegura un z-index alto */}
      <nav className="bg-black p-2 rounded-xl flex items-center">
        <button onClick={toggleMenu} className="text-white">
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
        <div
          className={`absolute top-full right-0 mt-2 flex flex-col bg-black text-white overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "w-[130px] p-4 rounded-xl z-50" : "w-0 opacity-0"
          }`}
          style={{ zIndex: 50 }} // Asegura que esté por encima
        >
          <div
            className={`flex flex-col gap-3 ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            <Link to="/allUsers" className="text-white">
              Users
            </Link>
            <Link to="/allOrders" className="text-white">
              Orders
            </Link>
            <Link to="/createProduct" className="text-white">
              Create Product
            </Link>
            <Link to="/createCategory" className="text-white">
              Create Category
            </Link>
            <Link to="/profile" className="text-white">
              Profile
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default AdminNavBar;
