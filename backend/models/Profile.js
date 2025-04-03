// models/Profile.js
const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  photo: { type: String, required: true }, // URL to photo
  description: { type: String },
  address: { type: String, required: true }, // address string
  coordinates: { // For map marker (latitude and longitude)
    lat: { type: Number },
    lng: { type: Number },
  },
  contact: { type: String },
  interests: { type: [String] },
}, { timestamps: true });

module.exports = mongoose.model('Profile', ProfileSchema);
