// src/middleware/authMiddleware.js

const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Verificar si la solicitud es para obtener todos los menús
  if (req.baseUrl === '/api/menus' && req.method === 'GET') {
    // Permitir acceso público a la ruta que obtiene todos los menús
    return next();
  }

  if (!authHeader) {
    return res.status(401).json({ message: 'Acceso denegado. No se proporcionó ningún token.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, 'secret_key'); // Reemplaza 'secret_key' con la misma clave secreta usada en authRoutes.js
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
};

module.exports = authMiddleware;
