// src/routes/cart.js

const express = require('express');
const router = express.Router();

router.post('/add', (req, res) => {
  // Lógica para agregar elementos al carrito
});

router.delete('/:id', (req, res) => {
  // Lógica para eliminar elementos del carrito
});

module.exports = router;
