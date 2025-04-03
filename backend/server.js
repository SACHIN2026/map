// server.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
connectDB();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Routes
app.use('/api/profiles', require('./routes/profileRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
