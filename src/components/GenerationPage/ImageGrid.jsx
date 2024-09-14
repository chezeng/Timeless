import React from 'react';

const ImageGrid = () => {
  return (
    <div className="grid grid-cols-4 gap-4 bg-purple-400 p-4 rounded-lg">
      {[...Array(4)].map((_, index) => (
        <div 
          key={index}
          className="aspect-square bg-purple-300 rounded-lg shadow-md transition duration-300 ease-in-out hover:shadow-lg hover:scale-105"
        />
      ))}
    </div>
  );
};

export default ImageGrid;