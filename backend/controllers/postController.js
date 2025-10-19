const Post = require('../models/Post');
const slugify = require('slugify');

// CREATE post
exports.create = async (req, res) => {
  try {
    const data = req.body;
    data.slug = slugify(data.title) + '-' + Date.now().toString().slice(-5);
    const post = await Post.create(data);
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LIST posts (with pagination + search)
exports.list = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(50, parseInt(req.query.limit) || 10);
    const q = req.query.q ? { $text: { $search: req.query.q } } : {};
    const total = await Post.countDocuments(q);
    const posts = await Post.find(q)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('author', 'name');
    res.json({ posts, page, total, pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET single post
exports.get = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug }).populate('author', 'name');
    if (!post) return res.status(404).json({ error: 'Not found' });
    post.views = (post.views || 0) + 1;
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE post
exports.update = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Not found' });

    if (
      post.author.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    )
      return res.status(403).json({ error: 'Forbidden' });

    const data = req.body;
    Object.assign(post, data);
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE post
exports.remove = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Not found' });

    if (
      post.author.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    )
      return res.status(403).json({ error: 'Forbidden' });

    await post.deleteOne();
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LIKE / UNLIKE post
exports.like = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Not found' });

    const id = req.user._id;
    const liked = post.likes.find((x) => x.toString() === id.toString());

    if (liked)
      post.likes = post.likes.filter((x) => x.toString() !== id.toString());
    else post.likes.push(id);

    await post.save();
    res.json({ likes: post.likes.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
