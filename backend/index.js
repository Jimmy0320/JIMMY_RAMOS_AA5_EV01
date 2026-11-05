// Cargar las variables de entorno
require('dotenv').config();

const express = require('express');
const connectDB = require('./config/database');
const authRoutes = require('./routes/auth.routes');

// Crear la aplicación Express
const app = express();

// Permitir recibir datos en formato JSON
app.use(express.json());

// Ruta principal para comprobar el funcionamiento
app.get('/', (req, res) => {
    res.status(200).json({
        mensaje: 'Servicio web de autenticacion funcionando.'
    });
});

// Registrar las rutas de autenticacion
app.use('/api/auth', authRoutes);

// Iniciar el servidor despues de conectar MongoDB
const startServer = async () => {
    try {
        await connectDB();

        const PORT = process.env.PORT || 3000;

        app.listen(PORT, () => {
            console.log(`Servidor iniciado en el puerto ${PORT}`);
            console.log(`Registro: http://localhost:${PORT}/api/auth/register`);
            console.log(`Inicio de sesion: http://localhost:${PORT}/api/auth/login`);
        });

    } catch (error) {
        console.error('No fue posible iniciar el servidor:', error.message);
        process.exit(1);
    }
};

startServer();