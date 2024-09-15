import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Heart, Save, Share2, Play, Pause } from 'lucide-react';

const VideoDisplay = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { videoUrl, prompt, musicData } = location.state || {};
  const [showNotification, setShowNotification] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    if (musicData && audioRef.current) {
      audioRef.current.src = musicData.audio_url;
      audioRef.current.loop = true; // Loop the audio
    }
    
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.4; // Set playback rate to 0.4x
      videoRef.current.loop = true; // Enable looping for the video
    }
  }, [musicData]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        audioRef.current.pause();
      } else {
        videoRef.current.play();
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleLike = () => {
    navigate('/portfolio');
  };

  const handleSave = () => {
    const link = document.createElement("a");
    link.href = videoUrl;
    link.download = "dream_video.mp4";
    link.click();
  };

  const handleShare = () => {
    navigate('/community');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex flex-col items-center justify-center p-4">
      {showNotification && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg transition-all duration-300 ease-in-out">
          Video successfully saved to portfolio
        </div>
      )}
      
      <div className="w-1/2 lg:w-1/3 max-w-4xl bg-white rounded-3xl shadow-xl overflow-hidden">   
        <div className="aspect-w-16 aspect-h-9 bg-purple-200 relative">
          <video 
            ref={videoRef} 
            src={videoUrl} 
            className="w-full h-full object-cover" 
          />
          <button 
            onClick={handlePlayPause}
            className="absolute inset-0 m-auto w-16 h-16 bg-white bg-opacity-50 rounded-full flex items-center justify-center"
          >
            {isPlaying ? <Pause size={32} /> : <Play size={32} />}
          </button>
        </div>
        <div className="p-6">
          <p className="text-gray-600 text-center">{prompt}</p>
        </div>
      </div>
      
      <div className="mt-6 flex justify-between items-center w-full max-w-4xl">
        <div className="flex space-x-4">
          <button 
            onClick={handleLike}
            className="p-3 bg-purple-500 rounded-full text-white hover:bg-purple-600 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
          >
            <Heart size={24} />
          </button>
          <button 
            onClick={handleSave}
            className="p-3 bg-purple-500 rounded-full text-white hover:bg-purple-600 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
          >
            <Save size={24} />
          </button>
          <button 
            onClick={handleShare}
            className="p-3 bg-purple-500 rounded-full text-white hover:bg-purple-600 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
          >
            <Share2 size={24} />
          </button>
        </div>
        <div className="flex space-x-4">
          <button 
            onClick={() => navigate('/generation')}
            className="px-6 py-3 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
          >
            Dream more?
          </button>
          <button 
            onClick={() => navigate('/portfolio')}
            className="px-6 py-3 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
          >
            Portfolio Page
          </button>
        </div>
      </div>
      <audio ref={audioRef} />
    </div>
  );
};

export default VideoDisplay;