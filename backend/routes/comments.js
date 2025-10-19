const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const ctrl = require('../controllers/commentController');

// POST /api/comments  -> add comment (authenticated)
router.post('/', auth, ctrl.create);

// GET /api/comments/:postId -> list comments for a post
router.get('/:postId', ctrl.list);

// DELETE /api/comments/:id -> soft delete (author or admin)
router.delete('/:id', auth, ctrl.remove);

module.exports = router;
