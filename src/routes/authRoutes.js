// src/routes/authRoutes.js
const express = require('express');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (err) {
    res.status(400).json({ message: 'Error al registrar el usuario', error: err });
  }
});

// Ruta para autenticar un usuario
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }
    const token = jwt.sign({ userId: user._id }, 'secret_key', { expiresIn: '1h' }); // Reemplaza 'secret_key' con una clave secreta más segura
    res.json({ token });
  } catch (err) {
    res.status(400).json({ message: 'Error al autenticar el usuario', error: err });
  }
});

module.exports = router;
