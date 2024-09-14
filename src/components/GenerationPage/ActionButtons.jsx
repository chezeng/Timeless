import React from 'react';

const ActionButtons = () => {
  return (
    <div className="flex space-x-4">
      <button className="px-6 py-3 rounded-md text-white bg-purple-500 hover:bg-purple-600 active:bg-purple-700 transition duration-150 ease-in-out transform hover:-translate-y-1 active:translate-y-0 shadow-md">
        Stop and Change
      </button>
      <button className="px-6 py-3 rounded-md text-white bg-purple-500 hover:bg-purple-600 active:bg-purple-700 transition duration-150 ease-in-out transform hover:-translate-y-1 active:translate-y-0 shadow-md">
        Let's Dream!
      </button>
    </div>
  );
};

export default ActionButtons;