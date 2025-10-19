import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      nav('/');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={submit} style={{ maxWidth: 400 }}>
      <h2>Login</h2>
      <div><input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%' }} required /></div>
      <div style={{ marginTop: 8 }}><input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%' }} required /></div>
      <div style={{ marginTop: 8 }}><button type="submit">Login</button></div>
    </form>
  );
}
