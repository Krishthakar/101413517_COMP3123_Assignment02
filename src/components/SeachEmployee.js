import React, { useState } from 'react';
import API from '../services/api';

function SearchEmployee() {
  const [query, setQuery] = useState(''); // State to hold the search query
  const [results, setResults] = useState([]); // State to hold search results
  const [error, setError] = useState(''); // State to hold error messages
  const [loading, setLoading] = useState(false); // State for loading indicator

  const handleSearch = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    setLoading(true); // Show loading indicator

    try {
      const response = await API.get(`/employees?search=${query}`);
      setResults(response.data); // Update results
      if (response.data.length === 0) {
        setError('No employees found matching your query.');
      }
    } catch (err) {
      console.error('Error searching employees:', err);
      setError('Failed to search employees. Please try again.');
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  return (
    <div className="container">
      <h2>Search Employees</h2>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search by name or department"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {/* Show loading indicator */}
      {loading && <p>Loading...</p>}

      {/* Show error messages */}
      {error && <p className="error">{error}</p>}

      {/* Render search results */}
      <ul className="search-results">
        {results.map((employee) => (
          <li key={employee.id}>
            {employee.name} - {employee.department} - {employee.position} - ${employee.salary}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchEmployee;
