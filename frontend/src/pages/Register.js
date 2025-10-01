import react, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/users/register', { email, password, displayName });
      setMessage('Successfully Registered! Redirecting to Login...');
      setTimeout(() => navigate('/login'), 1500);
    }
    catch (err) {
      setMessage('Registration failed: ' + (err.response?.data?.error || err.message));
    }
  }

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto' }}>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="DisplayName"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          required ></input>
        <br></br>
        <br></br>

        <input
          type="text"
          placeholder="Email Address"
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
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Register;