const Comment = require('../models/Comment');

// CREATE a new comment
exports.create = async (req, res) => {
  try {
    const c = await Comment.create({
      post: req.body.post,
      author: req.user._id,
      body: req.body.body
    });
    res.json(c);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LIST all comments for a post
exports.list = async (req, res) => {
  try {
    const comments = await Comment.find({
      post: req.params.postId,
      isDeleted: false
    }).populate('author', 'name');
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE (soft delete) a comment
exports.remove = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ error: 'Not found' });

    // Only author or admin can delete
    if (
      comment.author.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    )
      return res.status(403).json({ error: 'Forbidden' });

    comment.isDeleted = true;
    await comment.save();

    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
