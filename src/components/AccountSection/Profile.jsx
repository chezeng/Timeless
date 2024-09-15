import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../apiConfig.json';

const Profile = () => {
  const [profileData, setProfileData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  
  // Fetch user profile data
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(config.base_url + 'user_profile', {
          headers: {
            token: localStorage.getItem('userId')
          },
        });
        console.log(response.data);
        setProfileData(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    
    fetchProfileData();
  }, []);

  // Handle file selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Submit form data to backend
      await axios.post(config.base_url + 'change_email', {
        email: profileData.email,
      },
          {headers: {token: localStorage.getItem('userId')}});
      await axios.post(config.base_url + 'change_password', {
            password: profileData.password,
          },
          {headers: {token: localStorage.getItem('userId')}});
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile.');
    }
  };

  // Render loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex space-x-10 lg:space-x-30 items-center justify-center min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-300">
      {/* Profile Image */}
      <div className="relative flex flex-col">
        <img
          src={profileData.picture || 'src/assets/logo.png'} 
          alt="Profile"
          className=" rounded-full w-64 h-64 object-cover border-4 border-white"
        />
        <button
          className=" text-purple-600 rounded-full italic hover:underline"
          onClick={() => document.getElementById('file-input').click()}
        >
          Edit Picture
        </button>
        <input
          type="file"
          id="file-input"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mt-8 bg-white p-6 rounded-lg shadow-lg w-1/3">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-semibold">
            Name
          </label>
          <input
            id="name"
            type="text"
            disabled
            value={profileData.username}
            className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg mt-1"
          />
        </div>
        
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-semibold ">
            Email
          </label>
          <input
            id="email"
            type="text"
            value={profileData.email}
            onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
            className="w-full px-3 py-2 border bg-white text-black border-gray-300 rounded-lg mt-1"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-semibold">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={profileData.password}
            onChange={(e) => setProfileData({ ...profileData, password: e.target.value })}
            className="w-full px-3 py-2 border bg-white text-black border-gray-300 rounded-lg mt-1"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded-lg mt-4 hover:bg-purple-700 transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Profile;
