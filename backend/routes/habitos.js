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

// PATCH marcar un hábito como completado
router.patch('/marcarcompletado/:id', async (req, res) => {
    try {
        const habito = await Habito.findById(req.params.id);
        if (!habito) {
            return res.status(404).json({ message: 'No se puede encontrar el hábito' });
        }
        habito.ultimoMarcado = new Date();
        if (diferenciaTiempoEnHoras(habito.ultimoMarcado, habito.ultimaActualizacion) > 24) {
            habito.dias = 1;
            habito.iniciadoEn = new Date();
            habito.ultimaActualizacion = habito.ultimoMarcado;
            const habitoActualizado = await habito.save();
            res.status(200).json({ mensaje: 'Hábito reiniciado', habito: habitoActualizado });
        }
        else {
            habito.dias = diferenciaTiempoEnDias(habito.ultimoMarcado, habito.iniciadoEn);
            habito.ultimaActualizacion = new Date();
            const habitoActualizado = await habito.save();
            res.status(200).json({ mensaje: 'Hábito marcado como completado', habito: habitoActualizado });
        }
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

const diferenciaTiempoEnHoras = (fecha1, fecha2) => {
    if (!fecha1 || !fecha2) return 0;
    const date1 = fecha1 instanceof Date ? fecha1 : new Date(fecha1);
    const date2 = fecha2 instanceof Date ? fecha2 : new Date(fecha2);
    const diferencia = Math.abs(date1.getTime() - date2.getTime());
    return diferencia / (1000 * 60 * 60);
}

const diferenciaTiempoEnDias = (fecha1, fecha2) => {
    if (!fecha1 || !fecha2) return 1;
    const date1 = fecha1 instanceof Date ? fecha1 : new Date(fecha1);
    const date2 = fecha2 instanceof Date ? fecha2 : new Date(fecha2);
    const diferencia = Math.abs(date1.getTime() - date2.getTime());
    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    return dias === 0 ? 1 : dias;
}

module.exports = router;
