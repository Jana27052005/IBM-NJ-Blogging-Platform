const mongoose = require('mongoose');
const CommentSchema = new mongoose.Schema({
post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
body: { type: String, required: true },
isDeleted: { type: Boolean, default: false },
createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Comment', CommentSchema);