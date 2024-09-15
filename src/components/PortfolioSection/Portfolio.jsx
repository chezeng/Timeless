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
        return items.filter(item => item.liked === 1);
      case "shared":
        return items.filter(item => item.is_shared);
      default:
        return items;
    }
  };

  const handleLike = async (id) => {
    const response = await axios.post(`${config.base_url}like_video`, {
        videoId: id
        }, {
        headers: { token: localStorage.getItem('userId') }
        });
    if (response.data.ok) window.location.reload();
  };

  const handleShare = async (url) => {
    window.open(url, '_blank').focus();
  };

  const handleDelete = async (url) => {
    const response = await axios.post(`${config.base_url}delete_picture`, {
      video: url
    }, {
      headers: { token: localStorage.getItem('userId') }
    });
    if (response.data.ok) window.location.reload();
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
            image={item.imageUrl}
            video={item.url}
            music={item.musicUrl}
            description={item.prompt}
            liked={item.liked}
            onLike={() => {item.liked = 1 - item.liked; console.log(item.liked); handleLike(item.id);}}
            onShare={() => handleShare(item.imageUrl)}
            onDelete={() => handleDelete(item.url)}
          />
        ))}
      </div>
    </div>
  );
};

export default Portfolio;