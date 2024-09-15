import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Typewriter from 'typewriter-effect';

const HomePage = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const titleRef = useRef(null);

  const titles = [
    "1960s America Woodstock","1970s Vietnam War","1920s Paris Jazz Age","1940s Europe World War II","1990s Seattle Grunge",'2000s "Y2K" Millennium',"2020s Global Pandemic",
    "2050s Mars Colony","1800s America Wild West","1700s Europe Enlightenment","1600s Japan Edo Period","1400s Italy Renaissance","1200s Middle East Crusades", "900s Vikings Age",
    "1980s New York Midtown","2010s Tokyo Tower","1900s London Big Ben","1500s China Forbidden City","1100s Europe Medieval Age",
    "100s Roman Empire","3000s Mars Colony","5000s Earth Orbit","8000s Andromeda Galaxy", "10000s Milky Way Galaxy", "100000s Universe Big Bang"
  ];

  useEffect(() => {
    // Simulating API check for user login status
    checkLoginStatus();

    // Apply glitch effect to title
    const glitchEffect = setInterval(() => {
      if (titleRef.current) {
        const letters = titleRef.current.textContent.split('');
        const glitchedLetters = letters.map(letter => 
          Math.random() > 0.95 ? `<span class="text-purple-800">${letter}</span>` : letter
        );
        titleRef.current.innerHTML = glitchedLetters.join('');
      }
    }, 100);

    return () => clearInterval(glitchEffect);
  }, []);

  const checkLoginStatus = async () => {
    // Replace this with your actual API call
    const userId = localStorage.getItem('userId');
    if (userId) {
      setIsLoggedIn(true);
    }
  };

  const handleDreamClick = () => {
    if (isLoggedIn) {
      // Navigate to generation page
      navigate('/generation');
    } else {
      // Navigate to login page
      navigate('/login');
    }
  };

  return (
    <div className="font-serif bg-gradient-to-br from-pink-100 via-purple-200 to-blue-300 flex flex-col h-screen items-center justify-center p-4">
      <h1 
        ref={titleRef}
        className="text-7xl font-serif italic font-bold mb-4 transition-all duration-300 ease-in-out text-purple-500"
      >
        Timeless
      </h1>
      <div className="text-3xl mb-8 flex items-center text-purple-700 italic">
        <span className="mr-1 font-serif italic">Relive the moments, feel the</span>
        <span className='font-bold font-serif italic'>
        <Typewriter
          options={{
            strings: titles,
            autoStart: true,
            loop: true,
            deleteSpeed: 10,
            delay: 75,
            pauseFor: 650,
          }}
        /></span>
      </div>
      <button
        onClick={handleDreamClick}
        className="px-8 py-3 rounded-lg mt-5 font-bold bg-gradient-to-br from-pink-200 border-2 hover:bg-white via-purple-300 to-blue-200 text-white text-xl transition duration-300 ease-in-out transform hover:scale-105"
      >
        Let's Dream!
      </button>
    </div>
  );
};

export default HomePage;