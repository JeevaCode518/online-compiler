import React from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../axios";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("http://localhost:8000/auth/logout", {}, { withCredentials: true });
      navigate("/login");
    } catch (err) {
      console.error("Error logging out", err);
    }
  };

  return (
    <header className="app-header">
      <div className="nav-left">
        <Link to="/explore" className="nav-link">Explore</Link>
        <Link to="/problems" className="nav-link">Problems</Link>
        <Link to="/contest" className="nav-link">Contest</Link>
      </div>
      <div className="nav-right">
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
    </header>
  );
};

export default Header;
