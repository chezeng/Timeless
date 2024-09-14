import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Generation from './components/Generation';
import Portfolio from './components/PortfolioSection/Portfolio';
import Community from './components/CommunitySection/Community';
import VideoDisplay from './components/VideoDisplay';
import Login from './components/AccountSection/Login';
import Signup from './components/AccountSection/Signup';

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
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
    </Router>
  );
}

export default App;