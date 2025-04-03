import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginAdmin } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      const resultAction = await dispatch(loginAdmin(credentials));
      if (loginAdmin.fulfilled.match(resultAction)) {
        // On successful login, navigate to home or admin panel
        navigate('/');
      }
    } catch (error) {
      console.error('Login failed', error);
      setErrorMessage('Invalid credentials. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      {errorMessage && <p className="mb-4 text-red-500">{errorMessage}</p>}
      <input
        type="text"
        placeholder="Username"
        value={credentials.username}
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        className="w-full p-2 border rounded mb-4"
      />
      <input
        type="password"
        placeholder="Password"
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        className="w-full p-2 border rounded mb-4"
      />
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
        Login
      </button>
    </form>
  );
};

export default Login;
