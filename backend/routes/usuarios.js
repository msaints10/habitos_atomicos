const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuarios');
const jwt = require('jsonwebtoken');

router.post('/registro', async (req, res) => {
    try {
        const { username, password } = req.body;
        const salt = await bcryptjs.genSalt(10);
        const passwordHash = await bcryptjs.hash(password, salt);
        const usuario = new Usuario({ username, password: passwordHash });
        await usuario.save();
        res.status(201).json({ mensaje: "Usuario Registrado Correctamente" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error en el Registro", descripcion: error.toString() });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        const usuario = await Usuario
            .findOne({ username: username });

        if (!usuario) {
            return res.status(400).json({ error: "Usuario no encontrado" });
        }

        const passwordValido = await bcryptjs.compare(password, usuario.password);
        if (!passwordValido) {
            return res.status(400).json({ error: "Contraseña incorrecta" });
        }

        const token = jwt.sign({
            userId: usuario._id
        }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });

        res.cookie('habitoToken', token, {
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 1000 * 60 * 60 * 24 * 7 // 7 días
        });
        
        res.status(200).json({ mensaje: "Inicio de Sesión Exitóso", token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error en el Login", descripcion: error.toString() });
    }
}); 

module.exports = router;