import React, { useState, useEffect } from "react";
import './portfolio.css'; 
import PortfolioItem from './PortfolioItem'; 
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Video, Heart, Share2 } from 'lucide-react';

const Portfolio = () => {
  const [items, setItems] = useState([]);
  const [activeSection, setActiveSection] = useState("video");
  const { section } = useParams();

  useEffect(() => {
    if (section) {
      setActiveSection(section);
    }
    fetchItems();
  }, [section]);
  
  const fetchItems = async () => {
    try {
      const response = await axios.get(`http://your-mongodb-atlas-api-url/${activeSection}`);
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  // Dummy cases
  const videoItems = [
    { id: 1, title: "City Walk", description: "1980s New York, People walking, car driving..." },
    { id: 2, title: "City Walk", description: "1980s New York, People walking, car driving..." },
    { id: 3, title: "City Walk", description: "1980s New York, People walking, car driving..." }
  ];

  const likedItems = [
    { id: 1, title: "Liked Video 1", description: "Cool video in the park..." },
    { id: 2, title: "Liked Video 2", description: "Amazing sunset walk..." },
  ];

  const sharedItems = [
    { id: 1, title: "Shared Video 1", description: "Interesting documentary..." },
    { id: 2, title: "Shared Video 2", description: "Short film about city life..." },
  ];

  // Function to render content based on the active section
  const renderSectionContent = () => {
    let items = [];

    if (activeSection === "video") {
      items = videoItems;
    } else if (activeSection === "liked") {
      items = likedItems;
    } else if (activeSection === "shared") {
      items = sharedItems;
    }

    return items.map((item) => (
      <PortfolioItem key={item.id} title={item.title} description={item.description} />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
      <div className="portfolio-container">
        <nav className="subsection-nav">
          <button className={`subsection-nav-button text-white  transition duration-150 ease-in-out transform hover:-translate-y-1 active:translate-y-0
          ${activeSection === "video" ? "active" : ""}`}
            onClick={() => setActiveSection("video")}>
              <Link to="/portfolio">
                <Video />
              </Link>
            </button>
            
          <button className={`subsection-nav-button text-white transition duration-150 ease-in-out transform hover:-translate-y-1 active:translate-y-0
          ${activeSection === "liked" ? "active" : ""}`}
              onClick={() => setActiveSection("liked")}>
              <Link to="/portfolio/liked">
                <Heart />
              </Link>
          </button>

          <button
            className={`subsection-nav-button text-white transition duration-150 ease-in-out transform hover:-translate-y-1 active:translate-y-0}`}
            onClick={() => setActiveSection("shared")}>
              <Link to="/portfolio/shared">
                <Share2 />
              </Link>
          </button>
        </nav>

        {/* Sub-section content */}
        <div className="portfolio-items">
          {renderSectionContent()}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
