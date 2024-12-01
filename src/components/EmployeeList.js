import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api'; // Axios instance configured with the backend

function EmployeeList({ onLogout }) {
  const [employees, setEmployees] = useState([]); // Employee data
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  // Fetch employees on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to access this page.');
      navigate('/login');
    } else {
      fetchEmployees();
    }
  }, [navigate]);

  // Function to fetch employees from the backend
  const fetchEmployees = async () => {
    try {
      setIsLoading(true); // Set loading to true
      const response = await API.get('/employees'); // Fetch employees
      setEmployees(response.data); // Store response data in state
    } catch (err) {
      console.error('Error fetching employees:', err);
      alert('Failed to fetch employees. Please try again later.');
    } finally {
      setIsLoading(false); // Set loading to false
    }
  };

  // Function to delete an employee
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this employee?');
    if (!confirmDelete) return;

    try {
      await API.delete(`/employees/${id}`); // Call delete API
      alert('Employee deleted successfully.');
      fetchEmployees(); // Refresh the employee list
    } catch (err) {
      console.error('Error deleting employee:', err);
      alert('Failed to delete employee. Please try again.');
    }
  };

  return (
    <div className="container">
      <h2>Employee List</h2>

      {/* Navigation Buttons */}
      <div className="nav-buttons">
        <button onClick={() => navigate('/add-employee')} className="button">
          Add Employee
        </button>
        <button onClick={() => navigate('/search-employee')} className="button">
          Search Employee
        </button>
        <button onClick={onLogout} className="button">
          Logout
        </button>
      </div>

      {/* Loading Indicator */}
      {isLoading ? (
        <p>Loading employees...</p>
      ) : (
        <>
          {/* No Employees Message */}
          {employees.length === 0 ? (
            <p>No employees found.</p>
          ) : (
            // Employee List
            <ul className="employee-list">
              {employees.map((employee) => (
                <li key={employee._id} className="employee-item">
                  <div>
                    <strong>{employee.name}</strong> - {employee.department} - {employee.position} - $
                    {employee.salary}
                  </div>
                  <div>
                    {/* Edit Button */}
                    <button
                      onClick={() => navigate(`/edit-employee/${employee._id}`)}
                      className="edit-button"
                    >
                      Edit
                    </button>
                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(employee._id)}
                      className="delete-button"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}

export default EmployeeList;
