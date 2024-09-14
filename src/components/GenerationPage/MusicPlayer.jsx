import React from 'react';
import { Play } from 'lucide-react';

const MusicPlayer = () => {
  return (
    <div className="bg-purple-200 rounded-lg p-6 shadow-md">
      <div className="aspect-square bg-purple-300 rounded-lg mb-4"></div>
      <h2 className="text-xl font-semibold mb-2">Title</h2>
      <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition duration-300 ease-in-out">
        <Play className="text-purple-600" size={24} />
      </button>
    </div>
  );
};

export default MusicPlayer;