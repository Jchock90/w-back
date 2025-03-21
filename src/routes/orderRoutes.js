const express = require('express');
const router = express.Router();
const { addOrder, getOrders, deleteOrder } = require('../controllers/orderController'); // Importa todas las funciones necesarias

router.post('/add', addOrder);
router.get('/', getOrders);
router.delete('/delete/:id', deleteOrder); // Utiliza deleteOrder directamente

module.exports = router;
