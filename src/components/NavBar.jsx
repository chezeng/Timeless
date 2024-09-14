import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Camera } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const navItems = ['Home', 'Portfolio', 'Community'];

  return (
    <nav className="shadow-md py-4 bg-white">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 group">
          <Camera className="text-purple-600 group-hover:text-purple-700 transition-colors duration-300" size={24} />
          <p className="text-2xl font-bold text-purple-600 group-hover:text-purple-700 transition-colors duration-300">Timeless</p>
        </Link>
        <div className="flex space-x-4">
          {navItems.map((item) => {
            const isActive = 
              (item === 'Home' && location.pathname === '/') || 
              (item !== 'Home' && location.pathname.startsWith(`/${item.toLowerCase()}`));
            return (
              <Link
                key={item}
                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-in-out
                  ${isActive
                    ? 'text-purple-600 font-bold border-b-2 border-purple-600' 
                    : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                  }
                  relative overflow-hidden
                `}
              >
                {item}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-purple-600 transform transition-transform duration-300 ease-in-out
                  ${isActive ? 'translate-x-0' : '-translate-x-full'}`}>
                </span>
              </Link>
            );
          })}
        </div>

        {/* Profile Section */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gray-300 rounded-full transition-transform duration-300 hover:scale-110"></div>
          <button className="px-4 py-2 rounded-md text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
            View Profile
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;