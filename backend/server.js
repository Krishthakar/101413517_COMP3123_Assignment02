// Import required modules
const express = require('express'); // Express for building the API
const mongoose = require('mongoose'); // Mongoose for interacting with MongoDB
const bodyParser = require('body-parser'); // Middleware for parsing JSON data
const cors = require('cors'); // Middleware for handling Cross-Origin Resource Sharing
require('dotenv').config(); // Load environment variables from .env file

// Import routes for authentication and employee management
const authRoutes = require('./routes/auth'); // Authentication routes
const employeeRoutes = require('./routes/employees'); // Employee routes

// Initialize the Express app
const app = express();

// Middleware configuration
app.use(cors()); // Enable CORS for cross-origin requests
app.use(bodyParser.json()); // Parse incoming JSON requests

// Set up API routes
app.use('/api/auth', authRoutes); // Routes for authentication
app.use('/api/employees', employeeRoutes); // Routes for employee management

// Connect to MongoDB database
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully')) // Log success message if connection is successful
  .catch((err) => console.error('MongoDB connection error:', err)); // Log error if connection fails

// Default route for the root endpoint
app.get('/', (req, res) => {
  res.send('Welcome to the Employee Management API'); // Display a welcome message
});

// Start the server
const PORT = process.env.PORT || 5000; // Use the port from environment variables or default to 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // Log the port the server is running on
