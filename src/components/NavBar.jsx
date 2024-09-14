import React from 'react';
import { Link } from 'react-router-dom';
import { Camera } from 'lucide-react';

const Navbar = ({ currentPage }) => {
  const navItems = ['Home', 'Portfolio', 'Community'];

  return (
    <nav className="shadow-md py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Camera className="text-purple-600" size={24} />
          <p className="text-2xl font-bold text-purple-600">Timeless</p>
        </div>
        <div className="flex space-x-4">
          {navItems.map((item) => (
            <Link
              key={item}
              to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
              className={`px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out
                ${currentPage === item 
                  ? 'text-purple-600 border-b-2 border-purple-600' 
                  : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                }`}
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Profile Section */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          <button className="px-4 py-2 rounded-md text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 transition duration-300 ease-in-out">
            View Profile
          </button>
        </div>

        {/* <div className="flex space-x-2">
            <button className="px-4 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition duration-150 ease-in-out">
              Sign in
            </button>
            <button className="px-4 py-2 rounded-md text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 transition duration-150 ease-in-out">
              Register
            </button>
          </div> */}
      </div>
    </nav>
  );
};

export default Navbar;