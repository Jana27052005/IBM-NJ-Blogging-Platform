// seed.js
require('dotenv').config();
const connectDB = require('./config/db');
const User = require('./models/User');
const Post = require('./models/Post');
const bcrypt = require('bcrypt');

(async () => {
  try {
    const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ibm_nj_blog';
    await connectDB(uri);

    console.log('Clearing users and posts...');
    await User.deleteMany({});
    await Post.deleteMany({});

    const hash = await bcrypt.hash('password', 10);

    console.log('Creating users...');
    const admin = await User.create({
      name: 'Admin',
      email: 'admin@example.com',
      password: hash,
      role: 'admin'
    });

    const alice = await User.create({
      name: 'Alice',
      email: 'alice@example.com',
      password: hash
    });

    const bob = await User.create({
      name: 'Bob',
      email: 'bob@example.com',
      password: hash
    });

    console.log('Creating posts...');
    await Post.create({
      title: 'Welcome to IBM-NJ Blogging Platform',
      slug: 'welcome-' + Date.now().toString().slice(-5),
      body: 'This is the first seeded post. Edit or delete it from the admin account.',
      author: admin._id,
      tags: ['welcome', 'seed']
    });

    await Post.create({
      title: 'How to use this demo',
      slug: 'how-to-use-' + Date.now().toString().slice(-5),
      body: '1) Register a user\n2) Create posts\n3) Comment and like posts.\n\nThis demo stores data in MongoDB.',
      author: alice._id,
      tags: ['guide']
    });

    await Post.create({
      title: 'Tips for writing good posts',
      slug: 'tips-writing-' + Date.now().toString().slice(-5),
      body: 'Write clear titles, use short paragraphs, and add tags for discoverability.',
      author: bob._id,
      tags: ['tips']
    });

    console.log('Seed completed. Users created: admin@example.com (password), alice@example.com, bob@example.com (password)');
    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err);
    process.exit(1);
  }
})();
