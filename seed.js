// seed.js
const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

const sampleProducts = [
  {
    name: "Impermeabilizante Acrílico Premium",
    category: "Impermeabilizantes",
    description: "Impermeabilizante acrílico de alta calidad para superficies expuestas",
    image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800",
    brand: "Fester",
    rating: 5,
    fullDescription: "Impermeabilizante acrílico premium formulado con resinas acrílicas de última generación. Proporciona una barrera impermeable duradera y flexible que se adapta a los movimientos naturales de la superficie. Ideal para azoteas, terrazas y cualquier superficie expuesta a la intemperie.",
    features: [
      "Excelente resistencia a la intemperie y rayos UV",
      "Altamente reflectante para reducir temperatura",
      "Fácil aplicación con brocha, rodillo o aspersión",
      "No tóxico y amigable con el medio ambiente",
      "Excelente adherencia sobre múltiples sustratos"
    ],
    applications: [
      "Azoteas y terrazas de concreto",
      "Losas de concreto",
      "Superficies de fibrocemento",
      "Impermeabilización preventiva"
    ],
    specifications: {
      presentation: "Cubetas de 19 L y 4 L",
      coverage: "4-6 m² por litro (2 manos)",
      dryingTime: "2-4 horas al tacto",
      colors: "Blanco, Terracota, Gris"
    }
  },
  {
    name: "Aditivo Súper Plastificante",
    category: "Aditivos",
    description: "Aditivo reductor de agua de alto rango para concreto",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800",
    brand: "Sika",
    rating: 5,
    fullDescription: "Aditivo súper plastificante de tercera generación basado en policarboxilatos modificados. Permite reducciones de agua de hasta 40% manteniendo la trabajabilidad del concreto. Mejora significativamente la resistencia mecánica y durabilidad del concreto.",
    features: [
      "Reduce el agua hasta 40%",
      "Incrementa resistencias tempranas y finales",
      "Mejora la trabajabilidad sin segregación",
      "Compatible con todos los tipos de cemento",
      "No contiene cloruros"
    ],
    applications: [
      "Concreto de alta resistencia",
      "Concreto autocompactable",
      "Elementos prefabricados",
      "Concreto bombeado"
    ],
    specifications: {
      presentation: "Tambores de 200 L y garrafas de 20 L",
      coverage: "0.8-2.0% del peso del cemento",
      dryingTime: "N/A",
      colors: "Líquido café claro"
    }
  },
  {
    name: "Membrana Asfáltica Prefabricada",
    category: "Impermeabilizantes",
    description: "Membrana de asfalto modificado con SBS de 4mm",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800",
    brand: "Fester",
    rating: 5,
    fullDescription: "Membrana impermeabilizante prefabricada de asfalto modificado con polímeros SBS (Estireno-Butadieno-Estireno), reforzada con poliéster no tejido. Proporciona una impermeabilización totalmente adherida de larga duración con excelente resistencia mecánica.",
    features: [
      "Alta resistencia al punzonamiento",
      "Excelente flexibilidad a bajas temperaturas",
      "Gran estabilidad dimensional",
      "Refuerzo de poliéster de alta resistencia",
      "Protección UV con granulado mineral"
    ],
    applications: [
      "Azoteas planas y con pendiente",
      "Cimentaciones",
      "Jardineras y macetas",
      "Estacionamientos"
    ],
    specifications: {
      presentation: "Rollos de 10 m x 1 m",
      coverage: "10 m² por rollo",
      dryingTime: "Inmediato al enfriarse",
      colors: "Negro con granulado gris"
    }
  }
];

async function seedDatabase() {
  try {
    console.log('🔄 Conectando a MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Conectado a MongoDB');

    console.log('🗑️  Limpiando base de datos...');
    await Product.deleteMany({});
    console.log('✅ Base de datos limpiada');

    console.log('📦 Insertando productos de ejemplo...');
    const products = await Product.insertMany(sampleProducts);
    console.log(`✅ ${products.length} productos insertados exitosamente`);

    console.log('\n📋 Productos creados:');
    products.forEach(product => {
      console.log(`   - ${product.name} (ID: ${product._id})`);
    });

    console.log('\n✨ Proceso completado exitosamente');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

seedDatabase();