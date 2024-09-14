import React, { useState } from 'react';
import ImageGrid from './ImageGrid';
import MusicPlayer from './MusicPlayer';
import ThoughtInput from './ThoughtInput';
import ActionButtons from './ActionButtons';
import axios from 'axios';
import config from '../../apiConfig.json'; // Assuming base_url and token are stored here

const Generation = () => {
  const [images, setImages] = useState([]);
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [musicData, setMusicData] = useState(null); // State for music data

  const generateImages = async () => {
    if (!time || !location) {
      alert('Please provide both time and location to generate images!');
      return;
    }

    try {
      const imageRequests = [...Array(4)].map(async () => {
        const response = await axios.post(`${config.base_url}/generate_image`, {
          time,
          location
        }, {
          headers: {
            token: config.token
          }
        });

        if (response.data.ok) {
          return response.data.data.imageUrl;
        } else {
          console.error("Image generation failed:", response.data.message);
          return null;
        }
      });

      // Get all image URLs
      const imageUrls = await Promise.all(imageRequests);
      setImages(imageUrls.filter(url => url !== null));
    } catch (error) {
      console.error("Error generating images:", error);
    }
  };

  // New function to fetch music data
  const generateMusic = async () => {
    if (!time || !location) {
      alert('Please provide both time and location to generate music!');
      return;
    }

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
    }
  };

  return (
    <div className="p-10 md:h-screen h-full pt-24">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3">
          <MusicPlayer musicData={musicData} /> {/* Pass music data */}
        </div>
        <div className="w-full md:w-2/3">
          <ImageGrid images={images} />
          <div className="mt-8 flex flex-row">
            <ThoughtInput setTime={setTime} setLocation={setLocation} setImages={setImages} />
            <ActionButtons generateImages={generateImages} showMusic={generateMusic} /> {/* Pass music generation function */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generation;
