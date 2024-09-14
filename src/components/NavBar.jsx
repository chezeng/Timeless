import React from 'react';

const NavBar = ({ currentPage, onPageChange }) => {
  const navItems = ['Home', 'Portfolio', 'Community'];

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="text-2xl font-bold text-purple-600">Timeless</div>
          <div className="flex space-x-4">
            {navItems.map((item) => (
              <button
                key={item}
                className={`px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out
                  ${currentPage === item 
                    ? 'text-purple-600 border-b-2 border-purple-600' 
                    : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                  }`}
                onClick={() => onPageChange(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="flex space-x-2">
            <button className="px-4 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition duration-150 ease-in-out">
              Sign in
            </button>
            <button className="px-4 py-2 rounded-md text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 transition duration-150 ease-in-out">
              Register
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;