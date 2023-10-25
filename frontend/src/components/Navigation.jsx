import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/Navigation.css";
import { UserContext } from "../App";

function Navigation() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const logout = function () {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const navigationForLoggedOutUser = () => {
    return (
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>

        <div className="userLoginItems">
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign up</Link>
        </div>
      </nav>
    );
  };

  const navigationForLoggedInUser = () => {
    return (
      <nav>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/expenses">Expenses</Link>
        <Link to="/income">Income</Link>

        <div className="userLoginItems">
          {user.display_name}
          <button onClick={logout}>Logout</button>
        </div>
      </nav>
    );
  };

  return user ? navigationForLoggedInUser() : navigationForLoggedOutUser();
}

export default Navigation;
