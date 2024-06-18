// src/app.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./src/routes/authRoutes'); // Asegúrate de que la ruta es correcta
const menuRoutes = require('./src/routes/menuRoutes'); // Asegúrate de que la ruta es correcta
const authMiddleware = require('./src/middlewares/authMiddleware');
const orderRoutes = require('./src/routes/orderRoutes');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb+srv://Jchock90:234201@cluster0.evebuqi.mongodb.net/waiterdestroyer')
  .then(() => {
    console.log('Conexión a MongoDB exitosa');
  })
  .catch((err) => {
    console.error('Error al conectar a MongoDB:', err);
  });

app.get('/', (req, res) => {
  res.send('¡Backend MERN funcionando correctamente!');
});

// Rutas de autenticación
app.use('/api/auth', authRoutes);
// Rutas de menús
app.use('/api/menus', menuRoutes);

app.use('/api/orders', orderRoutes);


app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
