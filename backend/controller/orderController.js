const Order = require('../models/order');
const OrderHistory = require('../models/orderHistory');

exports.createOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const { shippingAddress, billingAddress, sameAsShipping, items } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'No items to place order' });
    }

    const itemsCount = items.reduce((acc, it) => acc + Number(it.qty || 0), 0);
    const itemsTotal = items.reduce((acc, it) => acc + Number(it.price || 0) * Number(it.qty || 0), 0);

    const order = await Order.create({
      user: userId,
      shippingAddress,
      billingAddress,
      sameAsShipping: !!sameAsShipping,
      itemsCount,
      itemsTotal,
      status: 'PLACED',
    });

    await OrderHistory.create({ order: order._id, items });

    return res.status(201).json({ orderId: order._id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server Error' });
  }
};
