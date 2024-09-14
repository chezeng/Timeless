import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Save, Share2 } from 'lucide-react';

const VideoDisplay = () => {
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);

  const handleLike = () => {
    navigate('/portfolio/liked');
  };

  const handleSave = () => {
    // Implement save functionality here
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleShare = () => {
    navigate('/community');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex flex-col items-center justify-center p-4">
      {showNotification && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg transition-all duration-300 ease-in-out">
          Video successfully saved to portfolio
        </div>
      )}
      
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="aspect-w-16 aspect-h-9 bg-purple-200">
          {/* Placeholder for video - replace with actual video component */}
          <div className="flex items-center justify-center text-purple-600">
            Video will be displayed here
          </div>
        </div>
        <div className="p-6">
          <p className="text-gray-600 text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation...
          </p>
        </div>
      </div>
      
      <div className="mt-6 flex justify-between items-center w-full max-w-4xl">
        <div className="flex space-x-4">
          <button 
            onClick={handleLike}
            className="p-3 bg-purple-500 rounded-full text-white hover:bg-purple-600 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
          >
            <Heart size={24} />
          </button>
          <button 
            onClick={handleSave}
            className="p-3 bg-purple-500 rounded-full text-white hover:bg-purple-600 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
          >
            <Save size={24} />
          </button>
          <button 
            onClick={handleShare}
            className="p-3 bg-purple-500 rounded-full text-white hover:bg-purple-600 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
          >
            <Share2 size={24} />
          </button>
        </div>
        <div className="flex space-x-4">
          <button 
            onClick={() => navigate('/generation')}
            className="px-6 py-3 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
          >
            Dream more?
          </button>
          <button 
            onClick={() => navigate('/portfolio')}
            className="px-6 py-3 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
          >
            Portfolio Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoDisplay;