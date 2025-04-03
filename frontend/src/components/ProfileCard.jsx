// src/components/ProfileCard.jsx
import { Link } from 'react-router-dom';

const ProfileCard = ({ profile, onSummaryClick }) => {
  return (
    <div className="bg-white shadow-md rounded p-4 mb-4 flex">
      <img src={profile.photo} alt={profile.name} className="w-16 h-16 rounded-full mr-4" />
      <div className="flex-grow">
        <h2 className="font-bold text-xl">{profile.name}</h2>
        <p>{profile.description}</p>
        <div className="mt-2 flex gap-2">
          <button onClick={onSummaryClick} className="bg-blue-500 text-white px-3 py-1 rounded">
            Summary
          </button>
          <Link to={`/profile/${profile._id}`} className="bg-gray-500 text-white px-3 py-1 rounded">
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
