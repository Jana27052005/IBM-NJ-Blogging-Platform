import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PostView from './pages/PostView';
import NewPost from './pages/NewPost';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <div style={{ maxWidth: 900, margin: '20px auto', padding: '0 20px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:slug" element={<PostView />} />
          <Route path="/new" element={<NewPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
