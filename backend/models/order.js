const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
    phone: { type: String, required: true },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    shippingAddress: { type: addressSchema, required: true },
    billingAddress: { type: addressSchema, required: true },
    sameAsShipping: { type: Boolean, default: true },
    itemsCount: { type: Number, required: true },
    itemsTotal: { type: Number, required: true },
    status: { type: String, enum: ['PLACED', 'CANCELLED'], default: 'PLACED' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
