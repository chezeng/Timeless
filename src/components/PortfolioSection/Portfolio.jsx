import React, { useState, useEffect } from "react";

import axios from 'axios';
import './portfolio.css';
import PortfolioItem from './PortfolioItem';
import config from '../../apiConfig.json';
import { Video, Heart, Share2 } from 'lucide-react';

const Portfolio = () => {
  const [items, setItems] = useState([]);
  const [activeSection, setActiveSection] = useState("");
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
    <div className="portfolio-container h-screen">
      <div className="portfolio-header">
        <button onClick={() => setActiveSection("video")}>
          <Video /> Videos
        </button>
        <button onClick={() => setActiveSection("liked")}>
          <Heart /> Liked
        </button>
        <button onClick={() => setActiveSection("shared")}>
          <Share2 /> Shared
        </button>
      </div>
      <div className="portfolio-items">
        if(items){items.map((item) => (
          <PortfolioItem
            key={item.id}
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