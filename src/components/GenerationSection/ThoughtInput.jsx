import React, { useState } from 'react';

const ThoughtInput = ({ setTime, setLocation }) => {
  const [localTime, setLocalTime] = useState('');
  const [localLocation, setLocalLocation] = useState('');

  return (
    <div className="mb-4 mr-5 w-full space-y-4">
      <input
        className="w-full h-20 text-black bg-white text-xl p-2 mb-2 rounded-lg shadow-md border focus:border-purple-400 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
        placeholder="Enter a time period (e.g., 1920s)"
        value={localTime}
        onChange={(e) => {
          setLocalTime(e.target.value);
          setTime(e.target.value); // Update parent state
        }}
      />
      <input
        className="w-full h-30 text-black bg-white text-xl p-2 mb-2 rounded-lg shadow-md border focus:border-purple-400 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
        placeholder="Enter a location (e.g., New York City)"
        value={localLocation}
        onChange={(e) => {
          setLocalLocation(e.target.value);
          setLocation(e.target.value); // Update parent state
        }}
      />
    </div>
  );
};

export default ThoughtInput;