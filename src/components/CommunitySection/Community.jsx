import React from 'react';
import './community.css'; // Make sure this path is correct

const Community = () => {
  return (
    <div className="community-container min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
      <div className="gallery">
        <div className="box big"></div>
        <div className="box small"></div>
        <div className="box small"></div>
        <div className="box big"></div>
        <div className="box small"></div>
        <div className="box small"></div>
      </div>
    </div>
  );
};

export default Community;