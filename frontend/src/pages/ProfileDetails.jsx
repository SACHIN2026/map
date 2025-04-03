// src/pages/ProfileDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LoadingIndicator from '../components/LoadingIndicator';

const ProfileDetails = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/profiles/${id}`);
        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id]);

  if (loading) return <LoadingIndicator />;
  if (!profile) return <p className="mt-4 text-red-500">Profile not found</p>;

  return (
    <div className="bg-white shadow-md rounded p-4">
      <img src={profile.photo} alt={profile.name} className="w-24 h-24 rounded-full" />
      <h1 className="font-bold text-2xl mt-2">{profile.name}</h1>
      <p>{profile.description}</p>
      <p className="mt-2"><strong>Contact:</strong> {profile.contact}</p>
      <p className="mt-2"><strong>Interests:</strong> {profile.interests.join(', ')}</p>
      <p className="mt-2"><strong>Address:</strong> {profile.address}</p>
    </div>
  );
};

export default ProfileDetails;
