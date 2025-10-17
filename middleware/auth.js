// middleware/auth.js
const jwt = require('jsonwebtoken');
require('dotenv').config(); // ← AGREGAR ESTA LÍNEA

// Usa el mismo JWT_SECRET que tu API de autenticación
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.error('❌ ERROR: Falta la variable JWT_SECRET en .env');
  process.exit(1);
}

// Middleware para verificar el token JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Token no proporcionado. Acceso denegado.'
    });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.error('Error verificando token:', err.message);
      return res.status(403).json({
        success: false,
        error: 'Token inválido o expirado'
      });
    }
    
    // Adjuntar información del usuario a la petición
    req.user = user;
    next();
  });
};

// Middleware para verificar que el usuario sea admin
const requireAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      error: 'Usuario no autenticado'
    });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      error: 'Acceso denegado. Se requieren privilegios de administrador.'
    });
  }

  next();
};

module.exports = {
  authenticateToken,
  requireAdmin
};