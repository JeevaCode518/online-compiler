import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import api from "../../axios";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
         <Link 
          to="/" 
          className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
        >
          Home
        </Link>
        <Link 
          to="/explore" 
          className={`nav-link ${location.pathname === "/explore" ? "active" : ""}`}
        >
          Explore
        </Link>
        <Link 
          to="/problems" 
          className={`nav-link ${location.pathname === "/problems" ? "active" : ""}`}
        >
          Problems
        </Link>
        <Link 
          to="/contest" 
          className={`nav-link ${location.pathname === "/contest" ? "active" : ""}`}
        >
          Contest
        </Link>
         <Link 
          to="/addProblems" 
          className={`nav-link ${location.pathname === "/addProblems" ? "active" : ""}`}
        >
          Add Problems
        </Link>
      </div>
      <div className="nav-right">
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
    </header>
  );
};

export default Header;