// src/models/Order.js


const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  items: [
    {
      name: String,
      price: Number,
      quantity: Number
    }
  ],
  total: Number,
  date: { type: Date, default: Date.now },
  source: String,
  orderNumber: { type: Number, unique: true },
  printed: { type: Boolean, default: false } // Nuevo campo
});

module.exports = mongoose.model('Order', orderSchema);
