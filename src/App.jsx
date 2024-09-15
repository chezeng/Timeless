import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Generation from './components/GenerationSection/Generation';
import Portfolio from './components/PortfolioSection/Portfolio';
import Community from './components/CommunitySection/Community';
import VideoDisplay from './components/VideoDisplay';
import Login from './components/AccountSection/Login';
import Signup from './components/AccountSection/Signup';
import Profile from './components/AccountSection/Profile';

const App = () => {

  return (
    <div className='font-serif'>
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
            <Route path='/profile' element={<Profile />} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;