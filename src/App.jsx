import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Generation from './components/Generation';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/generation" element={<Generation />} />
      </Routes>
    </Router>
  );
}

export default App;
