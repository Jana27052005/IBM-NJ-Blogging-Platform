import React from 'react';

export default function Pagination({ page, pages, onPageChange }) {
  if (!pages || pages <= 1) return null;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12 }}>
      <button onClick={() => onPageChange(Math.max(1, page - 1))} disabled={page <= 1}>Prev</button>
      <div>Page {page} of {pages}</div>
      <button onClick={() => onPageChange(Math.min(pages, page + 1))} disabled={page >= pages}>Next</button>
    </div>
  );
}
