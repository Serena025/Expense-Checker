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
        <img src="https://images.freeimages.com/fic/images/icons/1681/siena/256/currency_dollar.png" alt="" style={{
    width: '40px',  
    height: 'auto',  
  }}
/>
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
    
      <nav className="nav-link">
        <div className="container">
        <div className="link-to">
          <Link to="/dashboard">Dashboard</Link>
        </div>
        <div className="link-to">
          <Link to="/expenses">Expenses</Link>
        </div>
        <div className="link-to">
          <Link to="/income">Income</Link>
        </div>
        <div className="link-to">
          <Link to="/new-income">New Income</Link> 
        </div>
        </div>

       

    
        <div className="userLoginItems">
          {user.display_name}
          <button onClick={logout} className="btn-login">Logout</button>
        </div>
      </nav>
    );
  };

  return user ? navigationForLoggedInUser() : navigationForLoggedOutUser();
}

export default Navigation;
