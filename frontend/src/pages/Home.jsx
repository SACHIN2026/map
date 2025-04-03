// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfiles } from '../store/profilesSlice';
import ProfileCard from '../components/ProfileCard';
import MapComponent from '../components/MapComponent';
import SearchBar from '../components/SearchBar';
import LoadingIndicator from '../components/LoadingIndicator';

const Home = () => {
  const dispatch = useDispatch();
  const { profiles, status, error } = useSelector((state) => state.profiles);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProfiles());
    }
  }, [status, dispatch]);

  const filteredProfiles = profiles.filter((profile) =>
    profile.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="w-full md:w-1/2">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        {status === 'loading' && <LoadingIndicator />}
        {error && <p className="text-red-500">Error: {error}</p>}
        {filteredProfiles.length === 0 && status === 'succeeded' && (
          <p className="mt-4">No profiles found. Please add some profiles in the admin panel.</p>
        )}
        {filteredProfiles.map((profile) => (
          <ProfileCard
            key={profile._id}
            profile={profile}
            onSummaryClick={() => setSelectedProfile(profile)}
          />
        ))}
      </div>
      <div className="w-full md:w-1/2 h-96">
        <MapComponent selectedProfile={selectedProfile} profiles={filteredProfiles} />
      </div>
    </div>
  );
};

export default Home;
