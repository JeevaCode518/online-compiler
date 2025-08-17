import React from "react";
import { useState } from "react";
import '../Login/Login.css';

function Register(){
    const [form, setUserName] = useState( {firstName: '', email: '', password: '' });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        // Your backend logic here
    };

    return(
        <div className="login-page">
            <form className="login-box" onSubmit={handleSubmit}>
                <h2 className="login-title">Join CodeVerse</h2>
                <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={form.firstName}
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
                {message && <p className="login-message">{message}</p>}
            </form>
        </div>
    );
}

export default Register;