// routes/profileRoutes.js
const express = require('express');
const router = express.Router();
const {
  getProfiles,
  getProfileById,
  createProfile,
  updateProfile,
  deleteProfile,
} = require('../controllers/profileController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getProfiles).post(protect, createProfile);
router.route('/:id')
  .get(getProfileById)
  .put(protect, updateProfile)
  .delete(protect, deleteProfile);

module.exports = router;
