import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/Signup";
import About from "./components/About";
import Expenses from "./components/Expenses";
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState(null);

  const backend_port = process.env.REACT_APP_BACKEND_PORT || 3001;
  let url = `http://localhost:${backend_port}/authentication/profile`;

  useEffect(() => {
    const getLoggedInUser = async () => {
      let response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      let user = await response.json();
      setUser(user);
    };
    getLoggedInUser();
  }, [url]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/about" element={<About />} />
          <Route path="/expenses" element={<Expenses />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
