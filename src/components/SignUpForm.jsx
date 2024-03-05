import React, { useState } from 'react';

// SignUpForm Component: Handles user sign-up form submission.
function SignUpForm({ onSignUp }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    onSignUp(email, password);
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button type="submit">Sign Up</button>
    </form>
    <div>
    {errorMessage && <div className="error-message">{errorMessage}</div>} 
  </div>
  </>
  );
}

export default SignUpForm;
