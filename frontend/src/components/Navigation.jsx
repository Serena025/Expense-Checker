import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navigation.css";

function Navigation() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/expenses">Expenses</Link>
      <Link to="/login">Login</Link>
      <Link to="/signup">Sign up</Link>
      <Link to="/about">About</Link>
    </nav>
  );
}

export default Navigation;
