const mongoose = require('mongoose');

const habitoSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        trim: true
    },
    descripcion: {
        type: String,
        required: true,
        trim: true
    },
    ultimaActualizacion: {
        type: Date,
        default: Date.now
    },
    ultimoMarcado: {
        type: Date,
        default: Date.now
    },
    dias: {
        type: Number,
        default: 1,
    },
    iniciadoEn: {
        type: Date,
        default: Date.now
    },
    usuarioId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuario',
        required: true
    },
}, {
    timestamps: true
});

const Habito = mongoose.model('Habito', habitoSchema);

module.exports = Habito;