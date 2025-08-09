const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createOrder, getMyOrders, getOrderById } = require('../controller/orderController');

router.post('/', auth, createOrder);
router.get('/mine', auth, getMyOrders);
router.get('/:id', auth, getOrderById);

module.exports = router;
