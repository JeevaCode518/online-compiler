import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { useNavigate, Link } from 'react-router-dom'; // Added Link here

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); //  Also fix this if not defined yet

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await axios.post('http://localhost:8000/auth/login', form, {
        withCredentials: true // if you're storing JWT in httpOnly cookie
      });
      const user = res.data.user;

      setMessage(`Welcome back, ${user.firstName}!`);
      navigate('/problems');
     
    } catch (err) {
      console.log("ERORR ", err);
      setMessage(err.response?.data || "Login failed");
    }
  };

  return (
    <div className="login-page">
      <form className="login-box" onSubmit={handleSubmit}>
        <h2 className="login-title">Login to CodeVerse</h2>
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
        <button type="submit">Login</button>

        <p className="register-prompt">
          New user? <Link className="register-link" to="/register">Join now</Link>
        </p>

        {message && <p className="login-message">{message}</p>}
      </form>
    </div>
  );
}

export default Login;