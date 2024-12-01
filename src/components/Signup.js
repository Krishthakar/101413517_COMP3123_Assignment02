// Import React and necessary hooks
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For programmatic navigation
import API from '../services/api'; // Service for API calls

function Signup() {
  // Define state variables for username and password inputs
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // useNavigate hook for redirecting users
  const navigate = useNavigate();

  // Function to handle signup form submission
  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      // Send a POST request to the signup API with username and password
      await API.post('/auth/signup', { username, password });

      // Show a success message to the user
      alert('Signup successful! You can now log in.');

      // Redirect the user to the Login page
      navigate('/login');
    } catch (err) {
      // Log any errors to the console and show an error message to the user
      console.error('Signup Error:', err.response || err.message);
      alert('Signup failed. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Signup</h2> {/* Title for the signup form */}

      {/* Signup form */}
      <form onSubmit={handleSignup} className="auth-form">
        {/* Input for username */}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)} // Update username state on input change
        />

        {/* Input for password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Update password state on input change
        />

        {/* Submit button for signup */}
        <button type="submit">Signup</button>
      </form>

      {/* Login link for users who already have an account */}
      <p>
        Already have an account?{' '}
        <a
          className="link"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate('/login');
          }}
        >
          Login here
        </a>
      </p>
    </div>
  );
}

export default Signup;
