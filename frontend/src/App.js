import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/Signup";
import About from "./components/About";

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
