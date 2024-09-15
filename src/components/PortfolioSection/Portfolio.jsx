import React, { useState, useEffect } from "react";
import axios from 'axios';
import './portfolio.css';
import PortfolioItem from './PortfolioItem';
import config from '../../apiConfig.json';
import { Video, Heart, Share2 } from 'lucide-react';


const Portfolio = () => {
  const [items, setItems] = useState([]);
  const [activeSection, setActiveSection] = useState("all");
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    fetchPortfolioItems();
  }, []);

  const fetchPortfolioItems = async () => {
    try {
      const response = await axios.get(`${config.base_url}/portfolio_images`, {
        headers: { token: userId }
      });
      setItems(response.data.data.videos);
    } catch (error) {
      console.error("Error fetching portfolio items:", error);
    }
  };

  const filterItems = () => {
    switch (activeSection) {
      case "liked":
        return items.filter(item => item.is_liked);
      case "shared":
        return items.filter(item => item.is_shared);
      default:
        return items;
    }
  };

  const handleLike = async (id) => {
    const updatedItems = items.map(item => 
      item.id === id ? { ...item, is_liked: !item.is_liked } : item
    );
    setItems(updatedItems);
    // TODO: Implement API call to update like status
  };

  const handleShare = async (id) => {
    const updatedItems = items.map(item => 
      item.id === id ? { ...item, is_shared: !item.is_shared } : item
    );
    setItems(updatedItems);
    // TODO: Implement API call to update share status
  };

  const handleDelete = async (id) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
    // TODO: Implement API call to delete item
  };

  return (
    <div className="portfolio-container bg-gradient-to-br from-pink-100 via-purple-100 to-blue-200 p-10 min-h-screen pt-40">
      <nav className="fixed top-24 left-10 flex flex-col space-y-4">
        <button
          className={`subsection-nav-button text-white transition duration-150 ease-in-out transform hover:-translate-y-1 active:translate-y-0
          ${activeSection === "all" ? "bg-blue-500" : "bg-gray-400"}`}
          onClick={() => setActiveSection("all")}
        >
          <Video />
        </button>
        <button
          className={`subsection-nav-button text-white transition duration-150 ease-in-out transform hover:-translate-y-1 active:translate-y-0
          ${activeSection === "liked" ? "bg-red-500" : "bg-gray-400"}`}
          onClick={() => setActiveSection("liked")}
        >
          <Heart />
        </button>
        <button
          className={`subsection-nav-button text-white transition duration-150 ease-in-out transform hover:-translate-y-1 active:translate-y-0
          ${activeSection === "shared" ? "bg-green-500" : "bg-gray-400"}`}
          onClick={() => setActiveSection("shared")}
        >
          <Share2 />
        </button>
      </nav>

      <div>
        {filterItems().map((item) => (
          <PortfolioItem
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            image={item.imageUrl}
            video={item.url}
            music={item.musicUrl}
            isLiked={item.is_liked}
            isShared={item.is_shared}
            onLike={handleLike}
            onShare={handleShare}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default Portfolio;