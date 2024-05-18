const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../../models'); // Importa el modelo de usuario

const router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

try {
  const user = await User.findOne({ where: { username } });

  if (!user) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  const token = jwt.sign({ userId: user.id, username: user.username }, 'secret_key', { expiresIn: '1h' });

  res.status(200).json({ token });
} catch (error) {
  console.error('Error al iniciar sesión:', error);
  res.status(500).json({ message: 'Error interno del servidor' });
}
});

module.exports = router;
