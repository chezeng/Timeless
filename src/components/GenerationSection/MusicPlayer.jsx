import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import axios from 'axios';

const MusicPlayer = () => {
  const [musicList, setMusicList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    fetchMusicList();
  }, []);

  useEffect(() => {
    if (musicList.length > 0) {
      loadCurrentSong();
    }
  }, [currentIndex, musicList]);

  const fetchMusicList = async () => {
    try {
      const response = await axios.post('http://10.37.117.49:5000/generate_audio');
      setMusicList(response.data);
    } catch (error) {
      console.error('Error fetching music list:', error);
    }
  };

  const loadCurrentSong = () => {
    if (audioRef.current) {
      audioRef.current.src = musicList[currentIndex].audio_url;
      audioRef.current.load();
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
    setCurrentTime(audioRef.current.currentTime);
    setDuration(audioRef.current.duration);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    if (currentIndex < musicList.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrevious = () => {
    setCurrentIndex(currentIndex === 0 ? musicList.length - 1 : currentIndex - 1);
  };

  const handleNext = () => {
    setCurrentIndex(currentIndex === musicList.length - 1 ? 0 : currentIndex + 1);
  };

  const handleProgressClick = (e) => {
    const progressBar = e.currentTarget;
    const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
    const progressBarWidth = progressBar.offsetWidth;
    const newTime = (clickPosition / progressBarWidth) * duration;
    audioRef.current.currentTime = newTime;
  };

  return (
    <div className="bg-purple-200 rounded-lg p-6 shadow-md max-w-sm mx-auto">
      <div className="aspect-square bg-purple-300 rounded-lg mb-4 overflow-hidden">
        <img
          src={musicList[currentIndex]?.image_url || ''}
          alt="Album Cover"
          className="w-full h-full object-cover"
        />
      </div>
      <h2 className="text-xl font-semibold mb-2">{musicList[currentIndex]?.title || 'Title'}</h2>
      <div className="mb-4 bg-purple-100 rounded-full h-2 overflow-hidden cursor-pointer" onClick={handleProgressClick}>
        <div 
          className="bg-purple-500 h-full transition-all duration-300 ease-in-out"
          style={{ width: `${(currentTime / duration) * 100}%` }}
        ></div>
      </div>
      <div className="flex justify-between text-sm text-purple-700 mb-4">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
      <div className="flex justify-center items-center space-x-4">
        <button 
          className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition duration-300 ease-in-out"
          onClick={handlePrevious}
        >
          <SkipBack className="text-purple-600" size={20} />
        </button>
        <button 
          className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition duration-300 ease-in-out"
          onClick={handlePlayPause}
        >
          {isPlaying ? (
            <Pause className="text-purple-600" size={24} />
          ) : (
            <Play className="text-purple-600" size={24} />
          )}
        </button>
        <button 
          className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition duration-300 ease-in-out"
          onClick={handleNext}
        >
          <SkipForward className="text-purple-600" size={20} />
        </button>
      </div>
      <audio 
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />
    </div>
  );
};

export default MusicPlayer;