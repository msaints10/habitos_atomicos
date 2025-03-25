const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;