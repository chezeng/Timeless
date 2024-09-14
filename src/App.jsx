import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Generation from './components/GenerationPage/Generation';

const App = () => {
  const [currentPage, setCurrentPage] = useState('Home');

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Router>
      <AppContent currentPage={currentPage} onPageChange={handlePageChange} />
    </Router>
  );
}

function AppContent({ currentPage, onPageChange }) {
  const location = useLocation();

  React.useEffect(() => {
    const path = location.pathname.slice(1) || 'Home';
    onPageChange(path);
  }, [location, onPageChange]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
      <Navbar currentPage={currentPage} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generation" element={<Generation />} />
        <Route path="/portfolio" element={<div>Portfolio Page</div>} />
        <Route path="/community" element={<div>Community Page</div>} />
      </Routes>
    </div>
  );
}

export default App;