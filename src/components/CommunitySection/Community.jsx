import React, {useEffect, useState} from 'react';
import './community.css';
import config from '../../apiConfig.json';
import axios from "axios";

const Community = () => {

  const [items, setItems] = useState([]);

  const fetchCommunityFeed = async() => {
    const response = await axios.get(config.base_url + 'community_feed', {
      headers: { token: localStorage.getItem('userId') }
    });
    setItems(response.data.data);
    console.log(items.length);
  }

  const sliceItems = () => {
    const chunkSize = 6;
    var chunkedItems = [];
    for (let i = 0; i < items.length; i += chunkSize) {
      const chunk = items.slice(i, i + chunkSize);
      chunkedItems.push(chunk);
    }
    return chunkedItems;
  }

  useEffect(() => {
    fetchCommunityFeed();
  }, []);

  return (
    <div className="community-container min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
      <div className="gallery">
        {sliceItems().map((chunk, index) => {
          switch (chunk.length) {
            case 1:
              return (
                  <>
                    <div className="box w-full h-full big"><img src={chunk[0]}/></div>
                  </>
              )
            case 2:
              return (
                  <>
                    <div className="box big"><img src={chunk[0]}/></div>
                    <div className="box small"><img src={chunk[1]}/></div>
                  </>
              )
            case 3:
                return (
                    <>
                        <div className="box big"><img src={chunk[0]}/></div>
                        <div className="box small"><img src={chunk[1]}/></div>
                        <div className="box small"><img src={chunk[2]}/></div>
                    </>
                )
            case 4:
                return (
                    <>
                        <div className="box big"><img className="h-full w-full" src={chunk[0]}/></div>
                        <div className="box small"><img className="h-full w-full" src={chunk[1]}/></div>
                        <div className="box small"><img className="h-full w-full" src={chunk[2]}/></div>
                        <div className="box small"><img  className="h-full w-full" src={chunk[3]}/></div>
                    </>
                )
            case 5:
                return (
                    <>
                        <div className="box big"><img src={chunk[0]}/></div>
                        <div className="box small"><img src={chunk[1]}/></div>
                        <div className="box small"><img src={chunk[2]}/></div>
                        <div className="box big"><img src={chunk[3]}/></div>
                        <div className="box small"><img src={chunk[4]}/></div>
                    </>
                )
            case 6:
                return (
                    <>
                        <div className="box big"><img src={chunk[0]}/></div>
                        <div className="box small"><img src={chunk[1]}/></div>
                        <div className="box small"><img src={chunk[2]}/></div>
                        <div className="box big"><img src={chunk[3]}/></div>
                        <div className="box small"><img src={chunk[4]}/></div>
                        <div className="box small"><img src={chunk[5]}/></div>
                    </>
                )
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
};

export default Community;