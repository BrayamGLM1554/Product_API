// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/products');
require('dotenv').config();

const app = express();

// Middleware de logging
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path}`);
  next();
});

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ ERROR: Falta la variable MONGODB_URI en .env');
  process.exit(1);
}

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Conectado a MongoDB - Base de datos de productos'))
  .catch(err => console.error('❌ Error conectando a MongoDB:', err));

// Routes
app.use('/api/products', productRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'API de Productos funcionando correctamente',
    timestamp: new Date().toISOString()
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    error: 'Error interno del servidor'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Ruta no encontrada'
  });
});

// Iniciar servidor
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`🚀 API de Productos corriendo en puerto ${PORT}`);
  console.log(`📝 Rutas disponibles:`);
  console.log(`   GET    /api/products - Listar todos los productos`);
  console.log(`   GET    /api/products/:id - Obtener producto por ID`);
  console.log(`   POST   /api/products - Crear producto (requiere token)`);
  console.log(`   PUT    /api/products/:id - Actualizar producto (requiere token)`);
  console.log(`   DELETE /api/products/:id - Eliminar producto (requiere token)`);
});