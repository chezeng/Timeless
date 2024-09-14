import { React, useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Heart, Share2, Trash2 } from 'lucide-react';

const PortfolioItem = ({ id, title, description, imageUrl }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    // TODO: Update like status in the database
  };

  const handleDelete = () => {
    setShowDeleteConfirm(true);
    setTimeout(() => setShowDeleteConfirm(false), 5000);
  };

  const confirmDelete = () => {
    // TODO: Delete item from the database
    setShowDeleteConfirm(false);
  };

  return (
    <div className="portfolio-item">
      <img src={imageUrl} alt={title} className="item-icon" />
      <div className="item-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="item-actions">
          <button className="action-button">
            <Heart />
          </button>

          <button className="action-button">
            <Trash2  />
          </button>

          <button className="action-button">
            <Link to="/portfolio/shared">
              <Share2 />
            </Link>
          </button>
        </div>
      </div>
      <button className="open-button">
        <Link to={`/videodisplay/${id}`} className="open-button">View</Link>
      </button>
    </div>
  );
};

export default PortfolioItem;
