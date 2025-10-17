// routes/products.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

// ============= RUTAS PÚBLICAS =============

// GET - Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    console.error('Error obteniendo productos:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener los productos'
    });
  }
});

// GET - Obtener un producto por ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Producto no encontrado'
      });
    }
    
    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Error obteniendo producto:', error);
    
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        error: 'ID de producto inválido'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Error al obtener el producto'
    });
  }
});

// ============= RUTAS PROTEGIDAS (requieren autenticación) =============

// POST - Crear un nuevo producto (requiere token)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const {
      name,
      category,
      description,
      image,
      brand,
      rating,
      fullDescription,
      features,
      applications,
      specifications
    } = req.body;

    // Validación básica
    if (!name || !category || !description || !image || !fullDescription) {
      return res.status(400).json({
        success: false,
        error: 'Faltan campos requeridos'
      });
    }

    // Crear nuevo producto
    const product = new Product({
      name,
      category,
      description,
      image,
      brand: brand || 'Fester',
      rating: rating || 5,
      fullDescription,
      features: features || [],
      applications: applications || [],
      specifications: specifications || {
        presentation: '',
        coverage: '',
        dryingTime: '',
        colors: ''
      }
    });

    await product.save();

    console.log(`✅ Producto creado por usuario: ${req.user.email}`);

    res.status(201).json({
      success: true,
      message: 'Producto creado exitosamente',
      data: product
    });
  } catch (error) {
    console.error('Error creando producto:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        error: 'Error de validación',
        details: Object.values(error.errors).map(err => err.message)
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Error al crear el producto'
    });
  }
});

// PUT - Actualizar un producto (requiere token)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Producto no encontrado'
      });
    }

    // Actualizar campos
    const allowedUpdates = [
      'name',
      'category',
      'description',
      'image',
      'brand',
      'rating',
      'fullDescription',
      'features',
      'applications',
      'specifications'
    ];

    allowedUpdates.forEach(field => {
      if (req.body[field] !== undefined) {
        product[field] = req.body[field];
      }
    });

    await product.save();

    console.log(`✅ Producto ${req.params.id} actualizado por usuario: ${req.user.email}`);

    res.json({
      success: true,
      message: 'Producto actualizado exitosamente',
      data: product
    });
  } catch (error) {
    console.error('Error actualizando producto:', error);
    
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        error: 'ID de producto inválido'
      });
    }
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        error: 'Error de validación',
        details: Object.values(error.errors).map(err => err.message)
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Error al actualizar el producto'
    });
  }
});

// DELETE - Eliminar un producto (requiere token)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Producto no encontrado'
      });
    }

    await Product.findByIdAndDelete(req.params.id);

    console.log(`✅ Producto ${req.params.id} eliminado por usuario: ${req.user.email}`);

    res.json({
      success: true,
      message: 'Producto eliminado exitosamente'
    });
  } catch (error) {
    console.error('Error eliminando producto:', error);
    
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        error: 'ID de producto inválido'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Error al eliminar el producto'
    });
  }
});

module.exports = router;