const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.register = async (req, res) => {
const { name, email, password } = req.body;
try{
if(await User.findOne({email})) return res.status(400).json({error:'Email exists'});
const hash = await bcrypt.hash(password, 10);
const user = await User.create({ name, email, password: hash });
const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
res.json({ user: { id: user._id, name: user.name, email: user.email }, token });
}catch(err){ res.status(500).json({error:err.message}); }
};


exports.login = async (req, res) => {
const { email, password } = req.body;
try{
const user = await User.findOne({ email });
if(!user) return res.status(400).json({error:'Invalid credentials'});
const ok = await bcrypt.compare(password, user.password);
if(!ok) return res.status(400).json({error:'Invalid credentials'});
const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
res.json({ user: { id: user._id, name: user.name, email: user.email }, token });
}catch(err){ res.status(500).json({error:err.message}); }
};