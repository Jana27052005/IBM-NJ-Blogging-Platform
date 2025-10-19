const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const ctrl = require('../controllers/postController');

// GET /api/posts        -> list (supports ?page=&limit=&q=)
router.get('/', ctrl.list);

// GET /api/posts/:slug  -> get single (increments views)
router.get('/:slug', ctrl.get);

// POST /api/posts       -> create (authenticated)
router.post('/', auth, ctrl.create);

// PUT /api/posts/:id    -> update (authenticated, owner or admin)
router.put('/:id', auth, ctrl.update);

// DELETE /api/posts/:id -> delete (authenticated, owner or admin)
router.delete('/:id', auth, ctrl.remove);

// POST /api/posts/:id/like -> like/unlike (authenticated)
router.post('/:id/like', auth, ctrl.like);

module.exports = router;
