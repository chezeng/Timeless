import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageGrid from './ImageGrid';
import MusicPlayer from './MusicPlayer';
import ThoughtInput from './ThoughtInput';
import ActionButtons from './ActionButtons';
import CircularProgress from '@mui/material/CircularProgress';  // Import MUI CircularProgress
import axios from 'axios';
import config from '../../apiConfig.json';

const Generation = () => {
  const [images, setImages] = useState([]);
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [musicData, setMusicData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoadingImages, setIsLoadingImages] = useState(false);  // Loading state for images
  const [isLoadingMusic, setIsLoadingMusic] = useState(false);  // Loading state for music
  const [isLoadingVideo, setIsLoadingVideo] = useState(false);  // Loading state for video
  const navigate = useNavigate();

  const generateImages = async () => {
    if (!time || !location) {
      alert('Please provide both time and location to generate images!');
      return;
    }

    setIsLoadingImages(true); // Start loading
    try {
      const imageRequests = [...Array(4)].map(async () => {
        const response = await axios.post(`${config.base_url}/generate_image`, {
          time: time,
          location: location
        }, {
          headers: {
            token: localStorage.getItem('userId')
          }
        });

        if (response.data.ok) {
          return response.data.data;
        } else {
          console.error("Image generation failed:", response.data.message);
          return null;
        }
      });

      // Get all image URLs
      const imageGenerated = await Promise.all(imageRequests);
      setImages(imageGenerated.filter(url => url.imageUrl !== null));
    } catch (error) {
      console.error("Error generating images:", error);
    } finally {
      setIsLoadingImages(false);  // Stop loading
    }
  };

  const generateMusic = async () => {
    if (!time || !location) {
      alert('Please provide both time and location to generate music!');
      return;
    }

    setIsLoadingMusic(true);  // Start music loading
    try {
      const response = await axios.post(`${config.base_url}/generate_audio`, {
        time,
        location
      }, {
        headers: {
          token: config.token
        }
      });

      if (response.data.ok) {
        setMusicData(response.data.data[0]); // Set music data for the first track
      } else {
        console.error("Music generation failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error generating music:", error);
    } finally {
      setIsLoadingMusic(false);  // Stop music loading
    }
  };

  const handleImageSelect = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleNext = async () => {
    if (!selectedImage) {
      alert('Please select an image before proceeding.');
      return;
    }

    setIsLoadingVideo(true);  // Start video loading
    try {
      const response = await axios.post(`${config.base_url}/generate_video`, {
        prompt: `${time} ${location}`,
        imageUrl: selectedImage.imageUrl
      }, {
        headers: { token: config.token }
      });

      if (response.data.ok) {
        navigate('/videodisplay', {
          state: {
            videoUrl: response.data.data,
            prompt: `${time} ${location}`,
            musicData: musicData
          }
        });
      } else {
        console.error("Video generation failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error generating video:", error);
    } finally {
      setIsLoadingVideo(false);  // Stop video loading
    }
  };

  return (
    <div className="bg-gradient-to-br from-pink-100 via-purple-100 to-blue-200 p-10 md:h-screen h-full pt-24">
      {isLoadingVideo && (  // Fullscreen loading spinner for video
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
          <CircularProgress size={80} />
        </div>
      )}
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3">
          <MusicPlayer musicData={musicData} isLoading={isLoadingMusic} /> {/* Pass isLoadingMusic prop */}
        </div>
        <div className="w-full md:w-2/3">
          <ImageGrid images={images} onSelect={handleImageSelect} selectedImage={selectedImage} isLoading={isLoadingImages} /> {/* Pass isLoadingImages prop */}
          <div className="mt-8 flex flex-row space-x-3">
            <ThoughtInput setTime={setTime} setLocation={setLocation} setImages={setImages} />
            <ActionButtons generateImages={generateImages} showMusic={generateMusic} handleNext={handleNext} selectedImage={selectedImage} /> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generation;
