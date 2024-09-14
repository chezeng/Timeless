import React from 'react';

const ThoughtInput = ({ thoughts, setThoughts }) => {

  return (
    <div className="mb-4 mr-5 w-full">
      <textarea
        className="w-full text-black bg-white p-4 rounded-lg shadow-md border border-purple-200 focus:border-purple-400 focus:ring focus:ring-purple-200 focus:ring-opacity-50 resize-none"
        rows="10"
        placeholder="Use your imagination to write down an era and place you want to stay!"
        value={thoughts}
        onChange={(e) => setThoughts(e.target.value)}
      />
    </div>
  );
};

export default ThoughtInput;