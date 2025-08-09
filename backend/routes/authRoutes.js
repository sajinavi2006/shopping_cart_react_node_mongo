const express = require('express');
const router = express.Router();
const { register, login, profile, updateProfile } = require('../controller/authController');
const auth = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/me', auth, profile);
router.put('/me', auth, updateProfile);

module.exports = router;


