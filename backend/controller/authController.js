const jwt = require('jsonwebtoken');
const User = require('../models/user');

function generateToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'dev_secret', {
    expiresIn: '7d',
  });
}

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const user = await User.create({ name, email, password });
    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    if (error && error.name === 'ValidationError') {
      // Prefer friendly message for password minlength
      const passwordErr = error.errors?.password;
      if (passwordErr && passwordErr.kind === 'minlength') {
        return res.status(400).json({ message: 'Password must be at least 6 characters' });
      }
      const messages = Object.values(error.errors || {}).map((e) => e.message);
      return res.status(400).json({ message: messages[0] || 'Validation error' });
    }
    if (error && (error.code === 11000 || error.code === '11000')) {
      return res.status(409).json({ message: 'Email already registered' });
    }
    console.error(error);
    return res.status(500).json({ message: 'Server Error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Missing credentials' });
    }

    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server Error' });
  }
};

exports.profile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server Error' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (email && email !== user.email) {
      const existing = await User.findOne({ email });
      if (existing && String(existing._id) !== String(user._id)) {
        return res.status(409).json({ message: 'Email already in use' });
      }
      user.email = email;
    }
    if (name) user.name = name;
    if (password) user.password = password;

    await user.save();

    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '7d' }),
    });
  } catch (error) {
    if (error && error.name === 'ValidationError') {
      const pwErr = error.errors?.password;
      if (pwErr && pwErr.kind === 'minlength') {
        return res.status(400).json({ message: 'Password must be at least 6 characters' });
      }
    }
    console.error(error);
    return res.status(500).json({ message: 'Server Error' });
  }
};


