import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // For programmatic navigation
import API from '../services/api';

function EditEmployee({ employeeId }) {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [position, setPosition] = useState('');
  const [salary, setSalary] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(''); // Error state

  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    // Fetch existing employee details
    const fetchEmployee = async () => {
      try {
        setLoading(true);
        const response = await API.get(`/employees/${employeeId}`);
        const { name, department, position, salary } = response.data;
        setName(name);
        setDepartment(department);
        setPosition(position);
        setSalary(salary);
      } catch (err) {
        console.error('Error fetching employee:', err);
        setError('Failed to fetch employee details.');
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [employeeId]);

  const handleEditEmployee = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/employees/${employeeId}`, { name, department, position, salary });
      alert('Employee updated successfully!');
      navigate('/employees'); // Redirect to the employee list
    } catch (err) {
      console.error('Error updating employee:', err);
      alert('Failed to update employee.');
    }
  };

  if (loading) {
    return <p>Loading employee details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container">
      <h2>Edit Employee</h2>
      <form onSubmit={handleEditEmployee} className="edit-form">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
        <input
          type="text"
          placeholder="Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
        <input
          type="number"
          placeholder="Salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />
        <button type="submit">Update Employee</button>
      </form>
    </div>
  );
}

export default EditEmployee;
