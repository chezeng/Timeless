import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Generation from './components/GenerationSection/Generation';
import Portfolio from './components/PortfolioSection/Portfolio';
import Community from './components/CommunitySection/Community';
import VideoDisplay from './components/VideoDisplay';

const App = () => {

  return (
    <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/generation" element={<Generation />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/community" element={<Community />} />
          <Route path="/videodisplay" element={<VideoDisplay />} />
        </Routes>
    </Router>
  );
}

export default App;