// Import the Mongoose library to work with MongoDB
const mongoose = require('mongoose');

// Define a schema (blueprint) for user accounts
const UserSchema = new mongoose.Schema({
  // A unique username for the user (must be a string and is required)
  username: {
    type: String,
    required: true, // This field is mandatory
    unique: true,   // No two users can have the same username
  },

  // Password for the user (must be a string and is required)
  password: {
    type: String,
    required: true, // This field is mandatory
  },
});

// Export the User model so it can be used in other parts of the application
// This will create a 'users' collection in the database
module.exports = mongoose.model('User', UserSchema);
