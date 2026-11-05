const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

// Servicio para registrar un usuario
const register = async (req, res) => {
    try {
        const { nombre, usuario, password } = req.body;

        // Validar que todos los campos sean obligatorios
        if (!nombre || !usuario || !password) {
            return res.status(400).json({
                mensaje: 'Todos los campos son obligatorios.'
            });
        }

        // Validar que los datos sean cadenas de texto
        if (
            typeof nombre !== 'string' ||
            typeof usuario !== 'string' ||
            typeof password !== 'string'
        ) {
            return res.status(400).json({
                mensaje: 'Los datos deben ser de tipo texto.'
            });
        }

        const nombreLimpio = nombre.trim();
        const usuarioLimpio = usuario.trim().toLowerCase();

        if (!nombreLimpio || !usuarioLimpio || !password.trim()) {
            return res.status(400).json({
                mensaje: 'Los campos no pueden estar vacios.'
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                mensaje: 'La contrasena debe tener al menos 6 caracteres.'
            });
        }

        // Comprobar si el usuario ya existe
        const usuarioExistente = await User.findOne({
            usuario: usuarioLimpio
        });

        if (usuarioExistente) {
            return res.status(409).json({
                mensaje: 'El usuario ya esta registrado.'
            });
        }

        // Proteger la contrasena antes de almacenarla
        const passwordHash = await bcrypt.hash(password, 10);

        // Crear y guardar el nuevo usuario
        const nuevoUsuario = new User({
            nombre: nombreLimpio,
            usuario: usuarioLimpio,
            password: passwordHash
        });

        await nuevoUsuario.save();

        return res.status(201).json({
            mensaje: 'Usuario registrado correctamente.'
        });

    } catch (error) {
        console.error('Error en el registro:', error.message);

        return res.status(500).json({
            mensaje: 'Error interno al registrar el usuario.'
        });
    }
};

// Servicio para iniciar sesion
const login = async (req, res) => {
    try {
        const { usuario, password } = req.body;

        // Validar los campos obligatorios
        if (!usuario || !password) {
            return res.status(400).json({
                mensaje: 'El usuario y la contrasena son obligatorios.'
            });
        }

        if (
            typeof usuario !== 'string' ||
            typeof password !== 'string'
        ) {
            return res.status(400).json({
                mensaje: 'Los datos deben ser de tipo texto.'
            });
        }

        // Buscar el usuario en la base de datos
        const usuarioEncontrado = await User.findOne({
            usuario: usuario.trim().toLowerCase()
        });

        if (!usuarioEncontrado) {
            return res.status(401).json({
                mensaje: 'Credenciales incorrectas.'
            });
        }

        // Comparar la contrasena ingresada con el hash almacenado
        const passwordValida = await bcrypt.compare(
            password,
            usuarioEncontrado.password
        );

        if (!passwordValida) {
            return res.status(401).json({
                mensaje: 'Credenciales incorrectas.'
            });
        }

        return res.status(200).json({
            mensaje: 'Autenticacion satisfactoria.',
            usuario: {
                id: usuarioEncontrado._id,
                nombre: usuarioEncontrado.nombre,
                usuario: usuarioEncontrado.usuario
            }
        });

    } catch (error) {
        console.error('Error en el inicio de sesion:', error.message);

        return res.status(500).json({
            mensaje: 'Error interno al iniciar sesion.'
        });
    }
};

// Exportar los servicios para utilizarlos en las rutas
module.exports = {
    register,
    login
};