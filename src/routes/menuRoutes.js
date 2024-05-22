const express = require('express');
const Menu = require('../models/menu');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Ruta para crear un nuevo menú
router.post('/add', authMiddleware, async (req, res) => {
  const { name, description, price, categoria, imagen } = req.body;
  try {
    const menu = new Menu({ name, description, price, categoria, imagen });
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

// Nueva ruta para editar un menú
router.put('/edit/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { name, description, price, categoria, imagen } = req.body;
  try {
    const menu = await Menu.findByIdAndUpdate(
      id,
      { name, description, price, categoria, imagen },
      { new: true }
    );
    if (!menu) {
      return res.status(404).json({ message: 'Menú no encontrado' });
    }
    res.status(200).json({ message: 'Menú actualizado exitosamente', menu });
  } catch (err) {
    res.status(400).json({ message: 'Error al actualizar el menú', error: err });
  }
});

// Nueva ruta para eliminar un menú
router.delete('/delete/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const menu = await Menu.findByIdAndDelete(id);
    if (!menu) {
      return res.status(404).json({ message: 'Menú no encontrado' });
    }
    res.status(200).json({ message: 'Menú eliminado exitosamente' });
  } catch (err) {
    res.status(400).json({ message: 'Error al eliminar el menú', error: err });
  }
});

module.exports = router;
