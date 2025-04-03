// src/components/MapComponent.jsx
import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix default icon issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const MapUpdater = ({ selectedProfile }) => {
  const map = useMap();
  useEffect(() => {
    if (selectedProfile && selectedProfile.coordinates) {
      map.setView(
        [selectedProfile.coordinates.lat, selectedProfile.coordinates.lng],
        13
      );
    }
  }, [selectedProfile, map]);
  return null;
};

const MapComponent = ({ selectedProfile, profiles }) => {
  const defaultPosition = [51.505, -0.09]; // Default center if no profile is selected

  return (
    <MapContainer center={defaultPosition} zoom={13} className="h-full w-full">
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {profiles.map((profile) =>
        profile.coordinates ? (
          <Marker
            key={profile._id}
            position={[profile.coordinates.lat, profile.coordinates.lng]}
          >
            <Popup>
              <strong>{profile.name}</strong><br />
              {profile.address}
            </Popup>
          </Marker>
        ) : null
      )}
      {selectedProfile && selectedProfile.coordinates && (
        <MapUpdater selectedProfile={selectedProfile} />
      )}
    </MapContainer>
  );
};

export default MapComponent;
