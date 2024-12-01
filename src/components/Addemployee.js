// Import React and useState for managing component state
import React, { useState } from 'react';

// Import API service to handle HTTP requests
import API from '../services/api';

function AddEmployee() {
  // Define state variables for form inputs
  const [name, setName] = useState(''); // Employee name
  const [department, setDepartment] = useState(''); // Employee department
  const [position, setPosition] = useState(''); // Employee position
  const [salary, setSalary] = useState(''); // Employee salary

  // Function to handle form submission
  const handleAddEmployee = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      // Send a POST request to the API to add a new employee
      await API.post('/employees', { name, department, position, salary });

      // Show a success message to the user
      alert('Employee added successfully!');
    } catch (err) {
      // Log any errors to the console and show an error message to the user
      console.error(err);
      alert('Failed to add employee.');
    }
  };

  // Render the form and input fields
  return (
    <div>
      <h2>Add Employee</h2> {/* Title for the form */}
      <form onSubmit={handleAddEmployee}>
        {/* Input field for employee name */}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)} // Update state on input change
        />

        {/* Input field for employee department */}
        <input
          type="text"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)} // Update state on input change
        />

        {/* Input field for employee position */}
        <input
          type="text"
          placeholder="Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)} // Update state on input change
        />

        {/* Input field for employee salary */}
        <input
          type="number"
          placeholder="Salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)} // Update state on input change
        />

        {/* Submit button to add employee */}
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
}

export default AddEmployee;
