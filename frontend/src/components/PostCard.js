import React from 'react';
import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
  return (
    <article style={{ border: '1px solid #ddd', padding: 12, borderRadius: 6 }}>
      <h3><Link to={'/post/' + post.slug}>{post.title}</Link></h3>
      <p style={{ fontSize: 13, color: '#666' }}>{post.excerpt}</p>
      <div style={{ fontSize: 12, color: '#999' }}>By {post.author?.name} • {new Date(post.createdAt).toLocaleDateString()}</div>
    </article>
  );
}
