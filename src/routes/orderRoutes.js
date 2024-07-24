// src/routes/orderRoutes.js

const express = require('express');
const router = express.Router();
const { addOrder, getOrders, deleteOrder, markAsPrinted, closeCashRegister } = require('../controllers/orderController'); // Importa todas las funciones necesarias

router.post('/add', addOrder);
router.get('/', getOrders);
router.delete('/delete/:id', deleteOrder); // Utiliza deleteOrder directamente
router.patch('/print/:id', markAsPrinted); // Nueva ruta para marcar órdenes como impresas
router.post('/close-cash-register', closeCashRegister); // Ruta para cerrar caja

module.exports = router;
