import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera } from 'lucide-react';

const timeOptions = ['1960s', '1970s', '1980s', '1990s', '2000s'];
const placeOptions = ['New York City', 'Paris', 'Tokyo', 'London', 'Los Angeles'];

const HomePage = () => {
  const [showTimeList, setShowTimeList] = useState(false);
  const [showPlaceList, setShowPlaceList] = useState(false);
  const [selectedTime, setSelectedTime] = useState('1980s');
  const [selectedPlace, setSelectedPlace] = useState('New York City');
  const navigate = useNavigate();

  const handleDream = () => {
    navigate('/generation');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex flex-col">


      <main className="flex-grow flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-5xl font-bold text-purple-600 mb-2">Timeless</h1>
        <p className="text-xl text-gray-600 mb-8">Relive the moments, Feel the Era</p>
        <p className="text-lg text-gray-700 mb-4">Which moment would you like today?</p>
        
        <div className="flex space-x-4 mb-6">
          <div className="relative">
            <button
              className="px-6 py-2 bg-white rounded-full text-purple-600 hover:bg-purple-50 transition duration-300 ease-in-out"
              onMouseEnter={() => setShowTimeList(true)}
              onMouseLeave={() => setShowTimeList(false)}
            >
              {selectedTime}
            </button>
            {showTimeList && (
              <ul className="absolute top-full left-0 mt-1 bg-white rounded-md shadow-lg py-1 z-10">
                {timeOptions.map((time) => (
                  <li
                    key={time}
                    className="px-4 py-2 hover:bg-purple-50 cursor-pointer"
                    onClick={() => {
                      setSelectedTime(time);
                      setShowTimeList(false);
                    }}
                  >
                    {time}
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          <div className="relative">
            <button
              className="px-6 py-2 bg-white rounded-full text-purple-600 hover:bg-purple-50 transition duration-300 ease-in-out"
              onMouseEnter={() => setShowPlaceList(true)}
              onMouseLeave={() => setShowPlaceList(false)}
            >
              {selectedPlace}
            </button>
            {showPlaceList && (
              <ul className="absolute top-full left-0 mt-1 bg-white rounded-md shadow-lg py-1 z-10">
                {placeOptions.map((place) => (
                  <li
                    key={place}
                    className="px-4 py-2 hover:bg-purple-50 cursor-pointer"
                    onClick={() => {
                      setSelectedPlace(place);
                      setShowPlaceList(false);
                    }}
                  >
                    {place}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        
        <button
          className="px-8 py-3 bg-purple-600 text-white rounded-full text-lg font-medium hover:bg-purple-700 transition duration-300 ease-in-out transform hover:-translate-y-1 active:translate-y-0"
          onClick={handleDream}
        >
          Let's Dream!
        </button>
      </main>
    </div>
  );
};

export default HomePage;