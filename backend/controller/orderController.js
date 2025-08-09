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

exports.getMyOrders = async (req, res) => {
  try {
    const userId = req.userId;
    const orders = await Order.find({ user: userId })
      .sort({ createdAt: -1 })
      .select('_id itemsCount itemsTotal status createdAt');
    return res.json(orders);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server Error' });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const userId = req.userId;
    const orderId = req.params.id;
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (String(order.user) !== String(userId)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    const history = await OrderHistory.findOne({ order: order._id });
    return res.json({
      _id: order._id,
      shippingAddress: order.shippingAddress,
      billingAddress: order.billingAddress,
      sameAsShipping: order.sameAsShipping,
      itemsCount: order.itemsCount,
      itemsTotal: order.itemsTotal,
      status: order.status,
      createdAt: order.createdAt,
      items: history?.items || [],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server Error' });
  }
};
