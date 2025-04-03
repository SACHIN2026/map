import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import LoadingIndicator from '../components/LoadingIndicator';

const AdminPanel = () => {
  const { token } = useSelector((state) => state.auth);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/profiles`);
      setProfiles(data);
      setLoading(false);
    };
    fetchProfiles();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/profiles/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfiles(profiles.filter((p) => p._id !== id));
    } catch (error) {
      console.error('Error deleting profile', error);
    }
  };

  if (loading) return <LoadingIndicator />;
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      {profiles.map((profile) => (
        <div key={profile._id} className="flex justify-between bg-gray-100 p-4 rounded mb-2">
          <span>{profile.name}</span>
          <button
            onClick={() => handleDelete(profile._id)}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      ))}
      {/* You can extend this panel with forms to add or edit profiles */}
    </div>
  );
};

export default AdminPanel;
