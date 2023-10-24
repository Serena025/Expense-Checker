import React, { useState } from 'react';
function SignupForm() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
  
	const handleSignup = () => {
		console.log(username, password);
	};
  
	return (
	  <div>
		<h2>Sign Up</h2>
		<form>
		  <div>
			<label htmlFor="username">Username</label>
			<input
			  type="text"
			  id="username"
			  value={username}
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
		  <button type="button" onClick={handleSignup}>
			Sign Up
		  </button>
		</form>
	  </div>
	);
  }
  
  export default SignupForm;
