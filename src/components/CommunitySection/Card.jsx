import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({ item }) => {
  const [hovered, setHovered] = useState(false);
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  // Simulate fetching the description from the AI Image Generation API
  const fetchDescription = async () => {
    const prompt = "In the dystopian metropolis of Night City, a fusion of human and robot coexistence...";
    const apiResponse = await fetch('/api/ai-image-description', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });
    const result = await apiResponse.json();
    setDescription(result.description);
  };

  const handleHover = () => {
    setHovered(true);
    fetchDescription(); // Fetch description when the card is hovered
  };

  const handleLeave = () => {
    setHovered(false);
  };

  return (
    <div
      className={`relative p-4 rounded-lg transition-all duration-300 ${hovered ? 'bg-gray-800' : 'bg-white'}`}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
      onClick={() => navigate(`/videodisplay/${item.id}`)}
    >
      <img src={item.imageUrl} alt={item.title} className="w-full h-40 object-cover rounded-lg" />
      <h3 className="mt-2 text-xl font-semibold">{item.title}</h3>
      {hovered && description && (
        <p className="text-white mt-2 absolute bottom-4 left-4 right-4">
          {description}
        </p>
      )}
    </div>
  );
};

export default Card;
