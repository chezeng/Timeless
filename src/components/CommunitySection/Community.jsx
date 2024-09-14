import React, { useState, useEffect, useCallback } from 'react';
import './community.css';

const Community = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateItems = useCallback((startIndex, count) => {
    const newItems = [];
    for (let i = 0; i < count; i += 3) {
      newItems.push({ id: startIndex + i, type: 'big' });
      newItems.push({ id: startIndex + i + 1, type: 'small' });
      newItems.push({ id: startIndex + i + 2, type: 'small' });
    }
    return newItems;
  }, []);

  const loadMoreItems = useCallback(() => {
    setLoading(true);
    // Simulate an API call
    setTimeout(() => {
      setItems(prevItems => [...prevItems, ...generateItems(prevItems.length, 6)]);
      setLoading(false);
    }, 500);
  }, [generateItems]);

  useEffect(() => {
    loadMoreItems();
    
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop 
        >= document.documentElement.offsetHeight - 100 
        && !loading
      ) {
        loadMoreItems();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMoreItems, loading]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
      <div className="gallery">
        {items.map(item => (
          <div key={item.id} className={`box ${item.type}`}></div>
        ))}
      </div>
      {loading && <div className="loading">Loading more...</div>}
    </div>
  );
};

export default Community;