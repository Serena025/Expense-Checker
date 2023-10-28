import React, { useEffect, useState } from "react";
import { getBackendURL } from "../common_functions";

function About() {
  const [groupMembers, setGroupMembers] = useState([]);  

  const url = `${getBackendURL()}/members`;
  useEffect(() => {    
    console.log("URL: ", url);
    fetch(url)
      .then((response) => response.json())
      .then((data) => setGroupMembers(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [url]);

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

export default About;
