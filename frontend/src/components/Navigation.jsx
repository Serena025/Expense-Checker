import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/Navigation.css"

function Navigation() {
  return (
    <nav>
      <Link to="/">Home</Link>
       <Link to="/dashboard">Dashboard</Link>
       <Link to="/expenses">expenses</Link>
<button variant="primary">
  <Link to="/login">Login form</Link>
</button>
<button variant="primary">
  <Link to="/signup">Sign up</Link>
</button>
      <Link to="/about">About</Link>
     
    </nav>
  );
}

export default Navigation;