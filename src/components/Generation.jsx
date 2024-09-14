import React, { useState } from 'react';
import NavBar from './NavBar'

const Generation = () => {
  const [currentPage, setCurrentPage] = useState('Home');
  const [thoughts, setThoughts] = useState('');

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
      <NavBar currentPage={currentPage} onPageChange={handlePageChange} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2">
            {/* Image Grid */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-purple-200 rounded-lg shadow-md">
              {[...Array(4)].map((_, index) => (
                <div 
                  key={index}
                  className="aspect-square bg-purple-400 rounded-lg shadow-inner"
                />
              ))}
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="mb-4" thoughts={thoughts} setThoughts={setThoughts}>
              <textarea
                className="w-full p-4 rounded-lg shadow-md border border-purple-200 focus:border-purple-400 focus:ring focus:ring-purple-200 focus:ring-opacity-50 resize-none"
                rows="6"
                placeholder="What are you thinking..."
                value={thoughts}
                onChange={(e) => setThoughts(e.target.value)}
              />
            </div>
            <div className="flex space-x-4">
              <button className="px-6 py-3 rounded-md text-white bg-purple-500 hover:bg-purple-600 active:bg-purple-700 transition duration-150 ease-in-out transform hover:-translate-y-1 active:translate-y-0 shadow-md">
                Stop and Change
              </button>
              <button className="px-6 py-3 rounded-md text-white bg-purple-500 hover:bg-purple-600 active:bg-purple-700 transition duration-150 ease-in-out transform hover:-translate-y-1 active:translate-y-0 shadow-md">
                Let's Dream!
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Generation;