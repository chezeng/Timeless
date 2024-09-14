import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause } from 'lucide-react';
import axios from 'axios';

const MusicPlayer = () => {
  const [musicList, setMusicList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // useEffect(() => {
  //   const response = await axios.get(`http://10.37.117.49:5000/music}`);
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setMusicList(data);
  //       render(data[0]);
  //     });
  // }, []);

  const render = (data) => {
    if (audioRef.current) {
      audioRef.current.src = data.audio_url;
    }
  };

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
    const progressPercent = (currentTime / duration) * 100;
    document.querySelector('.progress-bar-fill').style.width = `${progressPercent}%`;
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  return (
    <div className="bg-purple-200 rounded-lg p-6 shadow-md max-w-sm mx-auto">
      <div className="aspect-square bg-purple-300 rounded-lg mb-4 overflow-hidden">
        <img
          src={musicList[currentIndex]?.cover || ''}
          alt="Album Cover"
          className="w-full h-full object-cover"
        />
      </div>
      <h2 className="text-xl font-semibold mb-2">{musicList[currentIndex]?.name || 'Title'}</h2>
      <p className="text-purple-700 mb-4">{musicList[currentIndex]?.singer || 'Artist'}</p>
      <div className="mb-4 bg-purple-100 rounded-full h-2 overflow-hidden">
        <div className="progress-bar-fill bg-purple-500 h-full w-0 transition-all duration-300 ease-in-out"></div>
      </div>
      <div className="flex justify-between text-sm text-purple-700 mb-4">
        <span>{formatTime(audioRef.current?.currentTime || 0)}</span>
        <span>{musicList[currentIndex]?.time || '00:00'}</span>
      </div>
      <button 
        className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition duration-300 ease-in-out mx-auto"
        onClick={handlePlayPause}
      >
        {isPlaying ? (
          <Pause className="text-purple-600" size={24} />
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