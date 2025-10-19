const mongoose = require('mongoose');
const PostSchema = new mongoose.Schema({
title: { type: String, required: true },
slug: { type: String, required: true, unique: true },
body: { type: String, required: true },
excerpt: String,
author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
tags: [String],
image: String,
likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
views: { type: Number, default: 0 },
isPublished: { type: Boolean, default: true },
createdAt: { type: Date, default: Date.now },
updatedAt: Date
});
PostSchema.pre('save', function(next){
this.updatedAt = new Date();
if(!this.excerpt) this.excerpt = this.body.substring(0, 150) + '...';
next();
});
module.exports = mongoose.model('Post', PostSchema);