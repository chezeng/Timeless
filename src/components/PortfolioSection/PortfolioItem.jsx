import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Heart, Share2, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PortfolioItem = ({ id, title, description, image, video, music, isLiked, isShared, onLike, onShare, onDelete }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = () => {
    setShowDeleteConfirm(true);
    setTimeout(() => setShowDeleteConfirm(false), 5000);
  };

  const confirmDelete = () => {
    onDelete();
    setShowDeleteConfirm(false);
  };

  const navigate = useNavigate()

  return (

    <div className="portfolio-item">
      <img src={image} alt={description} className="item-icon" />
      <div className="item-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="item-actions">
          <button 
            className={`action-button ${isLiked ? 'bg-red-500' : ''}`} 
            onClick={onLike}
          >
            <Heart />
          </button>

          <button className="action-button" onClick={handleDelete}>
            <Trash2 />
          </button>

          <button 
            className={`action-button ${isShared ? 'bg-blue-500' : ''}`} 
            onClick={onShare}
          >
            <Share2 />
          </button>
        </div>
      </div>
      <button className="open-button" onClick={()=>{navigate('/videodisplay', {
          state: {
            videoUrl: video,
            prompt: ``,
            musicData: music
          }
        });}}>View
      </button>
      {showDeleteConfirm && (
        <div className="delete-confirm">
          <p>Are you sure you want to delete this item?</p>
          <button onClick={confirmDelete}>Yes</button>
          <button onClick={() => setShowDeleteConfirm(false)}>No</button>
        </div>
      )}
    </div>
  );
};

export default PortfolioItem;