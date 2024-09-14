import React, { useState } from "react";
import '../portfolio.css'; // Assuming you have some CSS styles
import PortfolioItem from './PortfolioItem'; // Import the new PortfolioItem component

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState("video");

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

        {/* Sub-section navigation */}
        <div className="subsection-nav">
        <button
            className={`subsection-nav-button ${activeSection === "video" ? "active" : ""}`}
            onClick={() => setActiveSection("video")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
              />
            </svg>
          </button>
          <button
            className={`subsection-nav-button ${activeSection === "liked" ? "active" : ""}`}
            onClick={() => setActiveSection("liked")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
          </button>
          <button
            className={`subsection-nav-button ${activeSection === "shared" ? "active" : ""}`}
            onClick={() => setActiveSection("shared")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
            </svg>
          </button>
        </div>

        {/* Sub-section content */}
        <div className="portfolio-items">
          {renderSectionContent()}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
