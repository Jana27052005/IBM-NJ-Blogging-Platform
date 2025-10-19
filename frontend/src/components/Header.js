import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const nav = useNavigate();

  const doLogout = () => {
    logout();
    nav('/');
  };

  return (
    <header style={{ background: '#111', color: '#fff', padding: 12 }}>
      <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>IBM-NJ Blog</Link>
        <div>
          <Link to="/" style={{ color: '#ddd', marginRight: 10 }}>Home</Link>
          {user ? (
            <>
              <Link to="/new" style={{ color: '#ddd', marginRight: 10 }}>New Post</Link>
              <button onClick={doLogout} style={{ background: 'transparent', border: '1px solid #ddd', color: '#ddd', padding: '6px 10px' }}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ color: '#ddd', marginRight: 10 }}>Login</Link>
              <Link to="/register" style={{ color: '#ddd' }}>Register</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
