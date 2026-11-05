const mongoose = require('mongoose');

// Esquema para almacenar los usuarios
const userSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true
    },
    usuario: {
        type: String,
        required: [true, 'El usuario es obligatorio'],
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    }
}, {
    timestamps: true
});

// Crear el modelo de usuario
const User = mongoose.model('User', userSchema);

module.exports = User;