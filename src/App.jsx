import { React, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Generation from './components/Generation';

function App() {
  const [currentPage, setCurrentPage] = useState('Home');
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Router>
      <NavBar currentPage={currentPage} onPageChange={handlePageChange} />
      <Routes>
        <Route path="/generation" element={<Generation />} />
      </Routes>
    </Router>
  );
}

export default App;
