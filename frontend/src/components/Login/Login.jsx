import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      // const res = await axios.post('https://codeverse-v5df.onrender.com/auth/login', form, {
      const res = await axios.post('https://codeverse-v5df.onrender.com/auth/login', form, {

        withCredentials: true
      });
      const user = res.data.user;
      localStorage.setItem('userId', user._id); // or user.id
      localStorage.setItem('user', JSON.stringify(user)); 
      console.log("USER ID",localStorage.getItem("userId"));
      setMessage(`Welcome back, ${user.firstName}!`);
      navigate('/dashboard');
    } catch (err) {
      setMessage(err.response?.data || "Login failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">Login to Codeverse</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            name="email"
            placeholder="Email address"
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
          <button type="submit">Sign In</button>
        </form>
        <p className="register-prompt">
          New here? <Link to="/register" className="register-link">Create an account</Link>
        </p>
        {message && <p className="login-message">{message}</p>}
      </div>
    </div>
  );
}

export default Login;