const express = require('express');
const router = express.Router();

// Importar los métodos del controlador
const {
    register,
    login
} = require('../controllers/auth.controller');

// Ruta para registrar usuarios
router.post('/register', register);

// Ruta para iniciar sesión
router.post('/login', login);

module.exports = router;