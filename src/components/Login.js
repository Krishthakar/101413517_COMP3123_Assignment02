import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // To disable the login button during processing
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true during API call

    try {
      const res = await API.post('/auth/login', { username, password });

      // Save token and redirect to employees page
      if (res.data.token) {
        localStorage.setItem('token', res.data.token); // Save token to localStorage
        alert('Login successful!');
        navigate('/employees'); // Redirect to employee list
      } else {
        throw new Error('No token received.');
      }
    } catch (err) {
      console.error('Login Error:', err.response || err.message);
      const errorMessage =
        err.response?.data?.message || 'Login failed. Please try again.';
      alert(errorMessage);
    } finally {
      setLoading(false); // Set loading to false after API call
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>

      <form onSubmit={handleLogin} className="auth-form">
        {/* Username Input */}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="auth-input"
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="auth-input"
        />

        {/* Login Button */}
        <button type="submit" className="auth-button" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <p>
        Don't have an account?{' '}
        <a
          href="#"
          className="link"
          onClick={(e) => {
            e.preventDefault();
            navigate('/signup');
          }}
        >
          Signup here
        </a>
      </p>
    </div>
  );
}

export default Login;
