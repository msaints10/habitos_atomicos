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
    }
}, {
    timestamps: true
});

const Habito = mongoose.model('Habito', habitoSchema);

module.exports = Habito;