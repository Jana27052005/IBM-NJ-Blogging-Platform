import React, { useEffect, useState } from 'react';
import API from '../api';
import PostCard from '../components/PostCard';
import Pagination from '../components/Pagination';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  const fetchPosts = async (p = 1) => {
    try {
      const { data } = await API.get('/posts?page=' + p + '&limit=6');
      setPosts(data.posts || []);
      setPages(data.pages || 1);
    } catch (err) {
      console.error('Failed to load posts', err);
    }
  };

  return (
    <div>
      <h2>Recent posts</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {posts.map(p => <PostCard key={p._id} post={p} />)}
      </div>
      <Pagination page={page} pages={pages} onPageChange={setPage} />
    </div>
  );
}
