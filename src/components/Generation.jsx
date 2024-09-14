import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import axios from 'axios';

const MusicPlayer = ({ thoughts }) => {
  const [musicList, setMusicList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    if (thoughts) {
      fetchMusicList();
    }
  }, [thoughts]);

  useEffect(() => {
    if (musicList.length > 0) {
      loadCurrentSong();
    }
  }, [currentIndex, musicList]);

  const fetchMusicList = async () => {
    try {
      const response = await axios.post('http://10.37.117.49:5000/generate_audio', {
        time: extractTime(thoughts),
        location: extractLocation(thoughts),
      }, {
        headers: {
          'token': 'your-api-token-here'
        }
      });
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

const Generation = () => {
  const [thoughts, setThoughts] = useState('');

  return (
    <div className="p-10 md:h-screen h-full pt-24">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3">
          <MusicPlayer thoughts={thoughts} />
        </div>
        <div className="w-full md:w-2/3">
          <div className="grid grid-cols-4 gap-4 bg-purple-400 p-4 rounded-lg">
            {[...Array(4)].map((_, index) => (
              <div 
                key={index}
                className="aspect-square bg-purple-300 rounded-lg shadow-md transition duration-300 ease-in-out hover:shadow-lg hover:scale-105"
              />
            ))}
          </div>

          <div className="mt-8 flex flex-row">
            <div className="mb-4 mr-5 w-full">
              <textarea
                className="w-full text-black bg-white p-4 rounded-lg shadow-md border border-purple-200 focus:border-purple-400 focus:ring focus:ring-purple-200 focus:ring-opacity-50 resize-none"
                rows="10"
                placeholder="Use your imagination to write down an era and place you want to stay!"
                value={thoughts}
                onChange={(e) => setThoughts(e.target.value)}
                thoughts={thoughts} setThoughts={setThoughts}
              />
            </div>

            <div className="flex flex-col space-y-4 w-1/4 text-sm md:text-md lg:text-lg">
              <button className="px-6 py-3 rounded-md text-white bg-purple-500 hover:bg-purple-600 active:bg-purple-700 transition duration-150 ease-in-out transform hover:-translate-y-1 active:translate-y-0 shadow-md">
                Upload Photo
              </button>
              <button className="px-6 py-3 rounded-md text-white bg-purple-500 hover:bg-purple-600 active:bg-purple-700 transition duration-150 ease-in-out transform hover:-translate-y-1 active:translate-y-0 shadow-md">
                Stop and Edit
              </button>
              <button className="px-6 py-3 rounded-md text-white bg-purple-500 hover:bg-purple-600 active:bg-purple-700 transition duration-150 ease-in-out transform hover:-translate-y-1 active:translate-y-0 shadow-md">
                Let's Dream!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generation;