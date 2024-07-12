// src/models/CashRegister.js

const mongoose = require('mongoose');

const cashRegisterSchema = new mongoose.Schema({
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
  orderNumber: { type: Number, unique: true }
});

module.exports = mongoose.model('CashRegister', cashRegisterSchema);
