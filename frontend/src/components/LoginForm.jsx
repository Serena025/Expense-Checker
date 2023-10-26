import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

function LoginForm() {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  console.log(user)

  async function handleLogin(e) {
    // Prevent normal action
    e.preventDefault();

    // Make request to backend
    const response = await fetch(`http://localhost:3001/authentication`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: userName,
        password: password,
      }),
    });

    // W
    const data = await response.json();
    if (response.status === 200) {
      localStorage.setItem("token", data.token);
      setUser(data.user);
      navigate("/dashboard");
    } else {
      setErrorMessage(data.message);
    }
    console.log(data);
  }

  return (

      <div className="login-container">
      <h1>Login</h1>
      {errorMessage !== null ? <div>{errorMessage}</div> : null}
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={userName}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleLogin} className="login-button">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
