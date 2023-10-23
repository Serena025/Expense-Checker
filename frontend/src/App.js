import "./App.css";
import React, { useEffect, useState } from "react";

function App() {
  const [groupMembers, setGroupMembers] = useState([]);

  const backend_port = process.env.REACT_APP_BACKEND_PORT || 3001;
  let url = `http://localhost:${backend_port}/members`;

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setGroupMembers(data))
      .catch((error) => console.error("Error fetching data:", error));
  });

  return (
    <div className="App">
      <h2>Budget Buddy Application</h2>

      <div className="groupMembers">
        <h3>Group Members</h3>
        <ul>
          {groupMembers.map((member, index) => (
            <li key={index}>{member.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
