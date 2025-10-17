# API de Productos - Impertula

API RESTful para gestión de productos de impermeabilización y aditivos.

## 📁 Estructura del Proyecto

```
products-api/
├── server.js                 # Punto de entrada de la aplicación
├── models/
│   └── Product.js           # Modelo de datos de productos
├── routes/
│   └── products.js          # Rutas de la API de productos
├── middleware/
│   └── auth.js              # Middleware de autenticación JWT
├── seed.js                  # Script para poblar la BD con datos
├── .env                     # Variables de entorno (no subir a git)
├── .env.example             # Ejemplo de variables de entorno
├── .gitignore              # Archivos a ignorar en git
├── package.json            # Dependencias del proyecto
└── README.md               # Este archivo
```

## 🚀 Instalación

1. **Clonar el repositorio o crear la estructura de carpetas**

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
   - Copia el archivo `.env.example` a `.env`
   - Edita `.env` con tus valores reales:
```env
MONGODB_URI=mongodb+srv://ADMIN:ADMIN12345678@cluster0.rvrn2ng.mongodb.net/impertula?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=tu_secreto_super_seguro_aqui
PORT=3002
```

> ⚠️ **IMPORTANTE**: El `JWT_SECRET` debe ser exactamente el mismo que usas en tu API de autenticación.

4. **Poblar la base de datos (opcional)**
```bash
npm run seed
```

5. **Iniciar el servidor**

Modo desarrollo (con nodemon):
```bash
npm run dev
```

Modo producción:
```bash
npm start
```

## 📌 Endpoints de la API

### Base URL
```
http://localhost:3002/api/products
```

### 🔓 Rutas Públicas (sin autenticación)

#### 1. Obtener todos los productos
```http
GET /api/products
```

**Respuesta exitosa:**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "_id": "...",
      "name": "Impermeabilizante Acrílico Premium",
      "category": "Impermeabilizantes",
      "description": "...",
      "image": "...",
      "brand": "Fester",
      "rating": 5,
      "fullDescription": "...",
      "features": [...],
      "applications": [...],
      "specifications": {...}
    }
  ]
}
```

#### 2. Obtener un producto específico
```http
GET /api/products/:id
```

**Parámetros:**
- `id` (string) - ID del producto en MongoDB

**Respuesta exitosa:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "...",
    ...
  }
}
```

### 🔒 Rutas Protegidas (requieren token JWT)

Para usar estas rutas, debes incluir el token en el header:
```
Authorization: Bearer TU_TOKEN_AQUI
```

#### 3. Crear un nuevo producto
```http
POST /api/products
Content-Type: application/json
Authorization: Bearer TOKEN
```

**Body:**
```json
{
  "name": "Nombre del producto",
  "category": "Categoría",
  "description": "Descripción corta",
  "image": "URL de la imagen",
  "brand": "Fester",
  "rating": 5,
  "fullDescription": "Descripción completa del producto",
  "features": [
    "Característica 1",
    "Característica 2"
  ],
  "applications": [
    "Aplicación 1",
    "Aplicación 2"
  ],
  "specifications": {
    "presentation": "Cubetas de 19 L",
    "coverage": "4-6 m² por litro",
    "dryingTime": "2-4 horas",
    "colors": "Blanco, Gris"
  }
}
```

**Respuesta exitosa:**
```json
{
  "success": true,
  "message": "Producto creado exitosamente",
  "data": {...}
}
```

#### 4. Actualizar un producto
```http
PUT /api/products/:id
Content-Type: application/json
Authorization: Bearer TOKEN
```

**Body:** (envía solo los campos que quieres actualizar)
```json
{
  "name": "Nuevo nombre",
  "rating": 4
}
```

#### 5. Eliminar un producto
```http
DELETE /api/products/:id
Authorization: Bearer TOKEN
```

**Respuesta exitosa:**
```json
{
  "success": true,
  "message": "Producto eliminado exitosamente"
}
```

## 🔐 Autenticación

Esta API usa JWT (JSON Web Tokens) para autenticación. Los tokens son generados por tu API de autenticación:

```
https://login-api-g0go.onrender.com/api/auth/login
```

### Obtener un token:

1. Hacer login en la API de autenticación:
```bash
curl -X POST https://login-api-g0go.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "tu@email.com",
    "password": "tupassword"
  }'
```

2. Usar el token recibido en las peticiones a esta API:
```bash
curl -X POST http://localhost:3002/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN_AQUI" \
  -d '{...}'
```

## 🧪 Probar la API

### Con cURL:

**Listar productos:**
```bash
curl http://localhost:3002/api/products
```

**Crear producto (con token):**
```bash
curl -X POST http://localhost:3002/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN" \
  -d '{
    "name": "Producto Test",
    "category": "Test",
    "description": "Descripción test",
    "image": "https://example.com/image.jpg",
    "brand": "Fester",
    "rating": 5,
    "fullDescription": "Descripción completa",
    "features": ["Feature