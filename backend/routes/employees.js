// Import required modules
const express = require('express'); // Express for handling HTTP requests
const Employee = require('../models/Employee'); // Employee model for interacting with the database
const router = express.Router(); // Router to define routes

// Route to get all employees
router.get('/', async (req, res) => {
  try {
    // Fetch all employees from the database
    const employees = await Employee.find();

    // Respond with the list of employees in JSON format
    res.json(employees);
  } catch (err) {
    // Respond with an error message in case of an issue
    res.status(500).json({ error: err.message });
  }
});

// Route to add a new employee
router.post('/', async (req, res) => {
  try {
    // Extract employee details from the request body
    const { name, department, position, salary } = req.body;

    // Create a new employee object using the Employee model
    const employee = new Employee({ name, department, position, salary });

    // Save the new employee to the database
    await employee.save();

    // Respond with a success message
    res.status(201).send('Employee added successfully');
  } catch (err) {
    // Respond with an error message in case of an issue
    res.status(500).json({ error: err.message });
  }
});

// Route to delete an employee by ID
router.delete('/:id', async (req, res) => {
  try {
    // Extract the employee ID from the request parameters
    const { id } = req.params;

    // Find and delete the employee by ID
    const result = await Employee.findByIdAndDelete(id);

    // Check if an employee was found and deleted
    if (!result) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    // Respond with a success message and the deleted employee details
    res.status(200).json({ message: 'Employee deleted successfully', employee: result });
  } catch (err) {
    // Respond with an error message in case of an issue
    res.status(500).json({ error: err.message });
  }
});

// Export the router so it can be used in other parts of the application
module.exports = router;
