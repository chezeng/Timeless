import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Generation from './components/GenerationPage/Generation';
import Portfolio from './components/Portfolio';
import Community from './components/Community';

const App = () => {

  return (
    <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/generation" element={<Generation />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/community" element={<Community />} />
        </Routes>
    </Router>
  );
}

export default App;