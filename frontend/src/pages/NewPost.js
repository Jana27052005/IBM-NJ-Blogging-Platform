import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

export default function NewPost() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState('');
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        title,
        body,
        tags: tags.split(',').map(t => t.trim()).filter(Boolean)
      };
      const { data } = await API.post('/posts', payload);
      nav('/post/' + data.slug);
    } catch (err) {
      alert('Failed to create post (login required)');
    }
  };

  return (
    <form onSubmit={submit} style={{ maxWidth: 700 }}>
      <h2>New Post</h2>
      <div><input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} style={{ width: '100%' }} required /></div>
      <div style={{ marginTop: 8 }}><textarea placeholder="Body" value={body} onChange={e => setBody(e.target.value)} style={{ width: '100%', minHeight: 200 }} required /></div>
      <div style={{ marginTop: 8 }}><input placeholder="Tags (comma separated)" value={tags} onChange={e => setTags(e.target.value)} style={{ width: '100%' }} /></div>
      <div style={{ marginTop: 8 }}><button type="submit">Publish</button></div>
    </form>
  );
}
