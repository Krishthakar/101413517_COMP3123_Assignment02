// Import the Mongoose library to work with MongoDB
const mongoose = require('mongoose');

// Create a schema (blueprint) for employee records
const EmployeeSchema = new mongoose.Schema({
  // Employee's full name (required field, must be a string)
  name: {
    type: String,
    required: true,
  },

  // Department the employee belongs to (e.g., HR, IT)
  department: {
    type: String,
    required: true,
  },

  // Job title or role of the employee (e.g., Manager, Developer)
  position: {
    type: String,
    required: true,
  },

  // Monthly or annual salary of the employee (must be a number)
  salary: {
    type: Number,
    required: true,
  },
});

// Export the Employee model so we can use it in other parts of our app
// This will create an 'employees' collection in the database
module.exports = mongoose.model('Employee', EmployeeSchema);
