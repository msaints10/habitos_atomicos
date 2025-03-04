const express = require('express');
const router = express.Router();
const Habito = require('../models/habitos');

// GET todos los hábitos
router.get('/', async (req, res) => {
    try {
        const habitos = await Habito.find();
        res.json(habitos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET un hábito
router.get('/:id', async (req, res) => {
    try {
        const habito = await Habito.findById(req.params.id);
        if (!habito) {
            return res.status(404).json({ message: 'No se puede encontrar el hábito' });
        }
        res.json(habito);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST nuevo hábito
router.post('/', async (req, res) => {
    const habito = new Habito({
        titulo: req.body.titulo,
        descripcion: req.body.descripcion
    });

    try {
        const nuevoHabito = await habito.save();
        res.status(201).json(nuevoHabito);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE eliminar un hábito
router.delete('/:id', async (req, res) => {
    try {
        const habito = await Habito.findById(req.params.id);
        if (!habito) {
            return res.status(404).json({ message: 'No se puede encontrar el hábito' });
        }
        await habito.deleteOne();
        res.json({ message: 'Hábito eliminado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PATCH actualizar un hábito
router.patch('/:id', async (req, res) => {
    try {
        const habito = await Habito.findById(req.params.id);
        if (!habito) {
            return res.status(404).json({ message: 'No se puede encontrar el hábito' });
        }
        habito.titulo = req.body.titulo;
        habito.descripcion = req.body.descripcion;
        const habitoActualizado = await habito.save();
        res.json(habitoActualizado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT actualizar un hábito
router.put('/:id', async (req, res) => {
    try {
        const habito = await Habito.findById(req.params.id);
        if (!habito) {
            return res.status(404).json({ message: 'No se puede encontrar el hábito' });
        }
        habito.titulo = req.body.titulo;
        habito.descripcion = req.body.descripcion;
        const habitoActualizado = await habito.save();
        res.json(habitoActualizado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
