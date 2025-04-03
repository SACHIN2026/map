const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to MongoDB');

    // Check if the admin user already exists
    const adminExists = await User.findOne({ username: 'admin' });
    if (!adminExists) {
      const admin = new User({
        username: 'admin',
        password: 'admin123', // Plain text here; it will be hashed in the pre-save hook.
      });
      await admin.save();
      console.log('Admin user created with credentials: username: admin, password: admin123');
    } else {
      console.log('Admin user already exists');
    }
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB', error);
  });
