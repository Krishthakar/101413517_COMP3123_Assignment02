import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import EmployeeList from './components/EmployeeList';
import AddEmployee from './components/Addemployee';
import EditEmployee from './components/Editemployee';
import SearchEmployee from './components/SeachEmployee';
import './App.css';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from storage
    window.location.href = '/login'; // Redirect to Login page
  };

  return (
    <Router>
      <Routes>
        {/* Default Route */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Login Route */}
        <Route path="/login" element={<Login />} />

        {/* Signup Route */}
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route
          path="/employees"
          element={
            <ProtectedRoute>
              <EmployeeList onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-employee"
          element={
            <ProtectedRoute>
              <AddEmployee />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-employee/:id"
          element={
            <ProtectedRoute>
              <EditEmployee />
            </ProtectedRoute>
          }
        />
        <Route
          path="/search-employee"
          element={
            <ProtectedRoute>
              <SearchEmployee />
            </ProtectedRoute>
          }
        />

        {/* Catch-All Route */}
        <Route path="*" element={<h2 style={{ textAlign: 'center' }}>Page Not Found</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
