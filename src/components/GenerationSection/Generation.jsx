import React, { useState } from 'react';
import ImageGrid from './ImageGrid';
import MusicPlayer from './MusicPlayer';
import ThoughtInput from './ThoughtInput';
import ActionButtons from './ActionButtons';

const Generation = () => {
  const [thoughts, setThoughts] = useState('');

  return (
    <div className="container mx-auto py-10 h-full">
      <div className="flex flex-col md:flex-row gap-8 mx-3 md:mx-3">
        <div className="w-full md:w-1/3">
          <MusicPlayer />
        </div>
        <div className="w-full md:w-2/3">
          <ImageGrid />
          <div className="mt-8 flex flex-row">
            <ThoughtInput thoughts={thoughts} setThoughts={setThoughts} />
            <ActionButtons />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generation;