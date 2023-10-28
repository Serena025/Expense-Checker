import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/Signup";
import About from "./components/About";
import Income from "./components/Income";
import Expenses from "./components/Expenses";
import { createContext, useState, useEffect } from "react";
import { getBackendURL } from "./common_functions";

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState(null);

  let url = `${getBackendURL()}/authentication/profile`;

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
          <Route path="/income" element={<Income />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
