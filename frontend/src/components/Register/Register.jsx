import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../Login/Login.css';

function Register() {
  const [form, setForm] = useState({ firstName: '',lastName: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await axios.post('https://codeverse-v5df.onrender.com/auth/register', form, {
        withCredentials: true,
      });

      if (res.data.user) {
        localStorage.setItem('userId', res.data.user._id);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        setMessage(`Welcome, ${res.data.user.firstName}!`);
        navigate('/dashboard');
      }
    } catch (err) {
      if (err.response?.status === 409) {
        setMessage('You already have an account with this email.');
      } else {
        setMessage(err.response?.data || 'Registration failed');
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">Join CodeVerse</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Register</button>
        </form>
        <p className="register-prompt">
          Already have an account? <Link to="/login" className="register-link">Login</Link>
        </p>
        {message && <p className="login-message">{message}</p>}
      </div>
    </div>
  );
}

export default Register;