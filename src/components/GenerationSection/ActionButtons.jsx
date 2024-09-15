import React from 'react';

const ActionButtons = ({ generateImages, showMusic, generateImagesWithDescription, handleNext, selectedImage }) => {
  return (
    <div className="flex flex-col space-y-4 w-1/4 text-sm md:text-md lg:text-lg">
      <button 
        className="px-6 py-3 rounded-md text-white bg-purple-500 hover:bg-purple-600 active:bg-purple-700 transition duration-150 ease-in-out transform hover:-translate-y-1 active:translate-y-0 shadow-md"
        onClick={showMusic} // Trigger the music player display
      >
        Listen!
      </button>
      <button 
        className="px-6 py-3 rounded-md text-white bg-purple-500 hover:bg-purple-600 active:bg-purple-700 transition duration-150 ease-in-out transform hover:-translate-y-1 active:translate-y-0 shadow-md"
        onClick={generateImages}
      >
        Draw!
      </button>

      {selectedImage && (
        <div className='block space-y-4 w-1/4 text-sm md:text-md lg:text-lg'>
          <button
              className="px-6 py-3 rounded-md text-white bg-purple-500 hover:bg-purple-600 active:bg-purple-700 transition duration-150 ease-in-out transform hover:-translate-y-1 active:translate-y-0 shadow-md"
              onClick={generateImagesWithDescription}
          >
            Regenerate!
          </button>
          <button
              onClick={handleNext}
              className="px-6 py-3 rounded-md text-white bg-purple-500 hover:bg-purple-600 active:bg-purple-700 transition duration-150 ease-in-out transform hover:-translate-y-1 active:translate-y-0 shadow-md"
          >
            Watch!
          </button>
        </div>
        )}
    </div>
  );
};

export default ActionButtons;
