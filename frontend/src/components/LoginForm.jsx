import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { getBackendURL } from "../common_functions";

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
    const url = `${getBackendURL()}/authentication`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: userName,
        password: password,
      }),
    });

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
    <div className="login">
      <div className="login-container">
           <div className="background-image">
      <h1 className="signup-title">Login</h1>
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
    </div>
    </div>
  );
}

export default LoginForm;
