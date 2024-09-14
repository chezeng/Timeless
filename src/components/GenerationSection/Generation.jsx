import React, { useState } from 'react';
import ImageGrid from './ImageGrid';
import MusicPlayer from './MusicPlayer';
import ThoughtInput from './ThoughtInput';
import ActionButtons from './ActionButtons';

const Generation = () => {
  const [thoughts, setThoughts] = useState('');

  return (
    <div className="p-10 md:h-screen h-full pt-24">
      <div className="flex flex-col md:flex-row gap-8">
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