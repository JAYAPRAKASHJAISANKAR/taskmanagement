// Signin.js
import React, { useState } from 'react';

const Signin = ({ handleSignin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignin(email, password);
    setEmail('');
    setPassword('');
  };

  return (
    <div>
      <h2>Signin</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Signin</button>
      </form>
    </div>
  );
};

export default Signin;
