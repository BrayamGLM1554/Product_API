// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre del producto es requerido'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'La categoría es requerida'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'La descripción es requerida'],
    trim: true
  },
  image: {
    type: String,
    required: [true, 'La imagen es requerida'],
    trim: true
  },
  brand: {
    type: String,
    required: [true, 'La marca es requerida'],
    default: 'Fester',
    trim: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
    default: 5
  },
  fullDescription: {
    type: String,
    required: [true, 'La descripción completa es requerida'],
    trim: true
  },
  features: {
    type: [String],
    required: true,
    validate: {
      validator: function(arr) {
        return arr && arr.length > 0;
      },
      message: 'Debe haber al menos una característica'
    }
  },
  applications: {
    type: [String],
    required: true,
    validate: {
      validator: function(arr) {
        return arr && arr.length > 0;
      },
      message: 'Debe haber al menos una aplicación'
    }
  },
  specifications: {
    presentation: {
      type: String,
      required: true,
      trim: true
    },
    coverage: {
      type: String,
      required: true,
      trim: true
    },
    dryingTime: {
      type: String,
      required: true,
      trim: true
    },
    colors: {
      type: String,
      required: true,
      trim: true
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware para actualizar updatedAt
productSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

productSchema.pre('findOneAndUpdate', function(next) {
  this.set({ updatedAt: Date.now() });
  next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;