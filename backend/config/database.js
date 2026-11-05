const mongoose = require('mongoose');

// Función para conectar la aplicación con MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Conexión a MongoDB establecida correctamente.');
    } catch (error) {
        console.error('Error al conectar con MongoDB:', error.message);
        process.exit(1);
    }
};

// Exportar la función para utilizarla desde index.js
module.exports = connectDB;