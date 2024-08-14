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
  source: String, // Añadir este campo
  orderNumber: { type: Number, unique: true } // Añadir el campo orderNumber
});

module.exports = mongoose.model('Order', orderSchema);

