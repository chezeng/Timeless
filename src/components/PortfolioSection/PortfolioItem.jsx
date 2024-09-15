import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Heart, Share2, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const PortfolioItem = ({ id, title, description, image, video, music, liked, isShared, onLike, onShare, onDelete }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const navigate = useNavigate();

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    onDelete(id);
    setShowDeleteConfirm(false);
  };

  const handleLike = () => {
    onLike(id);
  };

  const handleShare = () => {
    onShare(id);
  };

  return (
    <div className="flex portfolio-item h-fit relative bg-white rounded-lg shadow-md p-4 m-2">
      <img src={image} alt={description} className="w-fit h-48 object-cover rounded-md mb-4" />
      <div className="item-content">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="item-actions flex justify-between">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`action-button p-2 rounded-full ${liked === 1 ? 'bg-red-500 text-white' : 'bg-gray-200'}`} 
            onClick={handleLike}
          >
            <Heart />
          </motion.button>

          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="action-button p-2 rounded-full bg-gray-200" 
            onClick={handleDelete}
          >
            <Trash2 />
          </motion.button>

          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`action-button p-2 rounded-full ${isShared ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} 
            onClick={handleShare}
          >
            <Share2 />
          </motion.button>
        </div>
      </div>
      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="open-button mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={()=>{navigate('/videodisplay', {
          state: {
            videoUrl: video,
            prompt: description,
            musicData: music,
            title: title
          }
        });}}
      >
        View
      </motion.button>
      {showDeleteConfirm && (
        <div className="delete-confirm absolute top-0 left-0 w-full h-full bg-white bg-opacity-90 flex flex-col items-center justify-center">
          <p className="text-lg font-semibold mb-4">Are you sure you want to delete this item?</p>
          <div className="flex space-x-4">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-red-500 text-white px-4 py-2 rounded-md" 
              onClick={confirmDelete}
            >
              Yes
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md" 
              onClick={() => setShowDeleteConfirm(false)}
            >
              No
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioItem;