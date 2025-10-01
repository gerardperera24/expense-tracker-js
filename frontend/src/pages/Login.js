import React, { use, useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handlelogin = async (e) => {
    e.preventDefault();
    try {
      const res = await post('/users/login', { email, password });
      localStorage.setItem('token', res.data.token);
      setMessage('Login successful! Redirecting....');
      setTimeout(() => navigate('/dashboard'), 1500);
    }
    catch (err) {
      setMessage('Login Failed: ' + (err.response?.data?.error || err.message))
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto' }}>
      <h2>Login</h2>
      <form onSubmit={handlelogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required ></input>
        <br></br>
        <br></br>

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required ></input>
        <br></br>
        <br></br>

        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Login;
