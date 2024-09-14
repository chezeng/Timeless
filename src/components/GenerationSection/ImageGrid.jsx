import React from 'react';

const ImageGrid = ({ images }) => {
  // Create an array of 4 items, filling with images or empty strings
  const gridImages = [...images, ...Array(4 - images.length).fill('')];

  return (
    <div className="grid grid-cols-4 gap-4 bg-purple-400 p-4 rounded-lg">
      {gridImages.map((image, index) => (
        <div 
          key={index}
          className="aspect-square bg-purple-300 rounded-lg shadow-md transition duration-300 ease-in-out hover:shadow-lg hover:scale-105"
        >
          {image && (
            <img 
              src={image} 
              alt={`Generated ${index}`} 
              className="w-full h-full object-cover rounded-lg"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
