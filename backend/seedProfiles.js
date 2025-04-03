// seedProfiles.js
const mongoose = require('mongoose');
const Profile = require('./models/Profile');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to MongoDB');
    const sampleProfiles = [
      {
        name: 'John Doe',
        photo: 'https://via.placeholder.com/150',
        description: 'A sample profile for John Doe.',
        address: '123 Main St, Anytown, USA',
        coordinates: { lat: 40.7128, lng: -74.0060 },
        contact: 'john@example.com',
        interests: ['music', 'sports'],
      },
      {
        name: 'Jane Smith',
        photo: 'https://via.placeholder.com/150',
        description: 'A sample profile for Jane Smith.',
        address: '456 Oak St, Somewhere, USA',
        coordinates: { lat: 34.0522, lng: -118.2437 },
        contact: 'jane@example.com',
        interests: ['reading', 'travel'],
      },
    ];
    await Profile.deleteMany({});
    await Profile.insertMany(sampleProfiles);
    console.log('Sample profiles added.');
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error('Error seeding profiles', error);
  });
