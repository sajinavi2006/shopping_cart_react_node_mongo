const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createOrder } = require('../controller/orderController');

router.post('/', auth, createOrder);

module.exports = router;
