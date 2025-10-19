import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api';

export default function PostView() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentBody, setCommentBody] = useState('');

  useEffect(() => {
    load();
  }, [slug] );

  const load = async () => {
    try {
      const { data } = await API.get('/posts/' + slug);
      setPost(data);
      fetchComments(data._id);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchComments = async (postId) => {
    try {
      const { data } = await API.get('/comments/' + postId);
      setComments(data);
    } catch (err) {
      console.error(err);
    }
  };

  const submitComment = async (e) => {
    e.preventDefault();
    try {
      await API.post('/comments', { post: post._id, body: commentBody });
      setCommentBody('');
      fetchComments(post._id);
    } catch (err) {
      alert('Failed to post comment (login required)');
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div>
      <h1>{post.title}</h1>
      <div style={{ color: '#888', fontSize: 13 }}>By {post.author?.name} • {new Date(post.createdAt).toLocaleString()}</div>
      <div style={{ marginTop: 12, whiteSpace: 'pre-wrap' }}>{post.body}</div>

      <hr style={{ margin: '20px 0' }} />
      <h3>Comments</h3>
      {comments.length === 0 && <div>No comments yet</div>}
      {comments.map(c => (
        <div key={c._id} style={{ borderBottom: '1px solid #eee', padding: '8px 0' }}>
          <div style={{ fontSize: 13, color: '#333' }}>{c.author?.name || 'Anonymous'}</div>
          <div style={{ fontSize: 14 }}>{c.body}</div>
          <div style={{ fontSize: 12, color: '#999' }}>{new Date(c.createdAt).toLocaleString()}</div>
        </div>
      ))}

      <form onSubmit={submitComment} style={{ marginTop: 12 }}>
        <textarea placeholder="Write a comment..." value={commentBody} onChange={e => setCommentBody(e.target.value)} style={{ width: '100%', minHeight: 80 }} />
        <div style={{ marginTop: 8 }}>
          <button type="submit">Post Comment</button>
        </div>
      </form>
    </div>
  );
}
