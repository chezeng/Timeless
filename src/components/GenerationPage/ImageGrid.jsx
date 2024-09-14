import React from 'react';

const ImageGrid = () => {
  return (
    <div className="grid grid-cols-2 gap-4 p-4 bg-purple-200 rounded-lg shadow-md">
      {[...Array(4)].map((_, index) => (
        <div 
          key={index}
          className="aspect-square bg-purple-400 rounded-lg shadow-inner"
        />
      ))}
    </div>
  );
};

export default ImageGrid;