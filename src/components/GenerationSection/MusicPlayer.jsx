import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';

const MusicPlayer = ({ musicData }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef('/assets/Color.mp3');

  useEffect(() => {
    if (musicData && audioRef.current) {
      audioRef.current.src = musicData.audio_url; // Set audio source when musicData changes
    }
  }, [musicData]);

  const formatTime = (time) => {
    const min = String(Math.floor(time / 60)).padStart(2, '0');
    const sec = String(Math.floor(time % 60)).padStart(2, '0');
    return `${min}:${sec}`;
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    const currentTime = audioRef.current.currentTime || 0;
    const duration = audioRef.current.duration || 0;
    document.querySelector('.current-time').textContent = formatTime(currentTime);
    document.querySelector('.music_progress_line').style.width = `${(currentTime / duration) * 100}%`;
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  return (
    <div className="bg-purple-200 rounded-lg p-6 shadow-md max-w-sm mx-auto">
      <div className="aspect-square bg-purple-300 rounded-lg mb-4 overflow-hidden">
        {musicData ? (
          <img src={musicData.image_url} alt="Album cover" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-purple-400"></div> // Placeholder
        )}
      </div>
      <h2 className="text-xl font-semibold mb-2">{musicData?.title || 'Title'}</h2>
      <p className="text-purple-700 mb-4">{musicData?.artist || 'Artist'}</p> {/* Artist placeholder */}
      <div className="mb-4 bg-purple-100 rounded-full h-2 overflow-hidden">
        <div className="progress-bar-fill bg-purple-500 h-full w-0 transition-all duration-300 ease-in-out"></div>
      </div>
      <div className="flex justify-between text-sm text-purple-700 mb-4">
        <span className="current-time">00:00</span>
        <span className="time">{formatTime(audioRef.current?.duration || 0)}</span>
      </div>
      <button 
        className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition duration-300 ease-in-out mx-auto"
        onClick={handlePlayPause}
      >
        {isPlaying ? (
          <Pause className="text-purple-600 " size={24} />
        ) : (
          <Play className="text-purple-600" size={24} />
        )}
      </button>
      <audio 
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />
    </div>
  );
};

export default MusicPlayer;
