import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';  // Import MUI CircularProgress

const ImageGrid = ({ images, onSelect, selectedImage, isLoading }) => {
  const gridImages = [...images, ...Array(4 - images.length).fill('')];

  return (
    <div className="grid grid-cols-4 gap-4 bg-gradient-to-br from-pink-100 border-4 border-white hover:bg-white via-purple-200 to-blue-200  p-4 rounded-lg">
      {gridImages.map((image, index) => (
        <div 
          key={index}
          className={`aspect-square bg-purple-400 rounded-lg shadow-md transition duration-300 ease-in-out hover:shadow-lg hover:scale-105 ${image === selectedImage ? 'ring-4 ring-purple-600' : ''}`}
          onClick={() => image && onSelect(image)}
        >
          {isLoading ? (  // Show loading spinner when isLoading is true
            <div className="flex items-center justify-center h-full">
              <CircularProgress />
            </div>
          ) : image ? (
            <img 
              src={image.imageUrl}
              alt={`Generated ${index}`} 
              className="w-full h-full object-cover rounded-lg cursor-pointer"
            />
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;