// controllers/profileController.js
const Profile = require('../models/Profile');

exports.getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find({});
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getProfileById = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (profile) res.json(profile);
    else res.status(404).json({ message: 'Profile not found' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createProfile = async (req, res) => {
  try {
    const profile = new Profile(req.body);
    const createdProfile = await profile.save();
    res.status(201).json(createdProfile);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (profile) {
      Object.assign(profile, req.body);
      const updatedProfile = await profile.save();
      res.json(updatedProfile);
    } else res.status(404).json({ message: 'Profile not found' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (profile) {
      await profile.remove();
      res.json({ message: 'Profile removed' });
    } else res.status(404).json({ message: 'Profile not found' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
