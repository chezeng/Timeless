import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@mui/material";

const Navbar = () => {
  const location = useLocation();
  const navItems = ['Generation', 'Portfolio', 'Community'];
  const [visible, setVisible] = useState(true);
  const [y, setY] = useState(window.scrollY);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulating login state

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < y) {
        setVisible(true);
      } else if (currentScrollY > 100) { // Only hide navbar after scrolling down 100px
        setVisible(false);
      }
      setY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [y]);

  useEffect(() => {
    const checkLoginStatus = () => {
      const userId = localStorage.getItem('userId');
      setIsLoggedIn(!!userId);
    };
    checkLoginStatus();
  }, []);

  return (
    <nav className={`fixed z-10 w-full shadow-md py-4 bg-white transition-transform duration-300 ${visible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 group -ml-4 mr-4">
        <div className='hover:scale-105 ease-in-out transition duration-150 flex space-x-2'>
          <img src="/src/assets/logo.png" alt="Timeless logo" className="w-8 h-8" />
          <p className="text-2xl font-bold text-purple-600 hover:text-purple-700">Timeless</p>
        </div>
        </Link>
        <div className="flex">
          {navItems.map((item) => {
            const isActive = 
              (item === 'Home' && location.pathname === '/') || 
              (item !== 'Home' && location.pathname.startsWith(`/${item.toLowerCase()}`));
            return (
              <Link
                key={item}
                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                className={`px-3 py-2 rounded-md transition-all duration-300 ease-in-out
                  ${isActive
                    ? 'text-purple-600 font-bold border-purple-600' 
                    : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                  }
                `}
              >
                {item}
              </Link>
            );
          })}
        </div>

        {/* Authentication Section */}
        <div className="flex items-center space-x-2">
          {isLoggedIn ? (
              <>
            <Link 
              to="/profile"
              className="flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              <span>{localStorage.getItem('userId')}</span>
            </Link>
              <Button
                  className="px-4 py-2 rounded-md text-sm font-medium text-purple-600 border border-purple-600 hover:bg-purple-50 transition-all transform "
                  onClick={() => {localStorage.clear(); window.location.reload();}}>Logout</Button>
                </>
          ) : (
            <>
              <Link 
                to="/login"
                className="px-4 py-2 rounded-md text-sm font-medium text-purple-600 border border-purple-600 hover:bg-purple-50 transition-all "
              >
                Login
              </Link>
              <Link 
                to="/signup"
                className="px-4 py-2 rounded-md text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 transition-all duration-300 ease-in-out"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;