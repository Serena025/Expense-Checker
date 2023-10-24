import React, { useContext } from "react";
import { CurrentUser } from "./CurrentUser";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/Navigation.css";

function Navigation() {
  const navigate = useNavigate();
  // const { currentUser } = useContext(CurrentUser);

  const logout = function () {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/expenses">Expenses</Link>
      <Link to="/about">About</Link>

      <div style={{ float: "right" }}>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign up</Link>
      </div>
    </nav>
  );
}

export default Navigation;
