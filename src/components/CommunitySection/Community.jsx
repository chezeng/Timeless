import React from 'react';
import './community.css';

const Community = () => {
  return (
    <div className="community-container min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
      <div className="gallery">
        <div className="box big">Big Box 1</div>
        <div className="box small">Small Box 1</div>
        <div className="box small">Small Box 2</div>
        <div className="box big">Big Box 2</div>
        <div className="box small">Small Box 3</div>
        <div className="box small">Small Box 4</div>
      </div>
    </div>
  );
};

export default Community;