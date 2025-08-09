const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    price: { type: Number, required: true },
    qty: { type: Number, required: true },
  },
  { _id: false }
);

const orderHistorySchema = new mongoose.Schema(
  {
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    items: { type: [orderItemSchema], required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('OrderHistory', orderHistorySchema);
