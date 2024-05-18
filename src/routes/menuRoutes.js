// src/routes/menuRoutes.js
const express = require('express');
const Menu = require('../models/menu');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Ruta para crear un nuevo menú
router.post('/add', authMiddleware, async (req, res) => {
  const { name, description, price } = req.body;
  try {
    const menu = new Menu({ name, description, price });
    await menu.save();
    res.status(201).json({ message: 'Menú creado exitosamente' });
  } catch (err) {
    res.status(400).json({ message: 'Error al crear el menú', error: err });
  }
});

// Ruta para obtener todos los menús
router.get('/', authMiddleware, async (req, res) => {
  try {
    const menus = await Menu.find();
    res.status(200).json(menus);
  } catch (err) {
    res.status(400).json({ message: 'Error al obtener los menús', error: err });
  }
});

module.exports = router;
