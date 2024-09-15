import React from 'react';

const ActionButtons = ({ generateImages, showMusic, generateImagesWithDescription, handleNext, selectedImage }) => {
  return (
    <div className="flex flex-col space-y-4 w-1/4 text-sm md:text-md lg:text-lg">

      <button
        onClick={generateImages}
        className="px-6 py-3 rounded-md font-bold bg-gradient-to-br from-pink-200 border-2 hover:bg-white via-purple-300 to-blue-200 text-white transition duration-300 ease-in-out transform hover:scale-105"
      >
        Draw!
      </button>

      <button
        onClick={showMusic}
        className="px-6 py-3 rounded-md font-bold bg-gradient-to-br from-pink-200 border-2 hover:bg-white via-purple-300 to-blue-200 text-white transition duration-300 ease-in-out transform hover:scale-105"
      >
        Listen!
      </button>

      {selectedImage && (
        <>
          <button
            onClick={handleNext}
            className="px-6 py-3 rounded-md font-bold bg-gradient-to-br from-pink-200 border-2 hover:bg-white via-purple-300 to-blue-200 text-white transition duration-300 ease-in-out transform hover:scale-105"
          >
            Watch!
          </button>


          <button
            onClick={generateImagesWithDescription}
            className="px-6 py-3 rounded-md font-bold bg-gradient-to-br from-pink-200 border-2 hover:bg-white via-purple-300 to-blue-200 text-white transition duration-300 ease-in-out transform hover:scale-105"
          >
            Restart!
          </button>
          </>
        )}
    </div>
  );
};

export default ActionButtons;
