import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const UserNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative flex justify-end ml-[300px]">
      <nav className="bg-black p-2 rounded-xl flex items-center">
        <button onClick={toggleMenu} className="text-white">
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
        <div
          className={`absolute top-full right-0 mt-2 flex flex-col bg-black text-white overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'w-[130px] p-4 rounded-xl' : 'w-0 opacity-0'
          }`}
        >
          <div className={`flex flex-col gap-3 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
            <Link to="/userOrders" className="text-white">
              My Orders
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

export default UserNavBar;
