import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleDream = () => {
    navigate('/generation');
  };

  return (
    <div className="h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex flex-col">
      <main className="flex-grow flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-5xl font-bold text-purple-600 mb-2">Timeless</h1>
        <p className="text-xl text-gray-600 mb-8">Relive the moments, Feel the Era</p>
        <p className="text-lg text-gray-700 mb-4">Which moment would you like today?</p>
        <button
          className="px-8 py-3 bg-purple-600 text-white rounded-full text-lg font-medium hover:bg-purple-700 transition duration-300 ease-in-out transform hover:-translate-y-1 active:translate-y-0"
          onClick={handleDream}
        >
          Let's Dream!
        </button>
      </main>
    </div>
  );
};

export default HomePage;