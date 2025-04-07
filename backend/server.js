require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const habitosRouter = require('./routes/habitos');
const usuariosRouter = require('./routes/usuarios');
const path = require('path');

const app = express();

// Configurar motor de vistas
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

app.use(express.json());
app.use(cors(
    {
        origin: 'https://frontend-ten-sigma-97.vercel.app',
        credentials: true
    }
));

// Rutas
app.get('/', (req, res) => {
    res.json({ title: 'API de Hábitos' });
});
app.use('/api/habitos', habitosRouter);
app.use('/api/usuarios', usuariosRouter);

// Conexión a MongoDB
connectDB();

app.use(function (req, res, next) {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.json({'error': err });
});

module.exports = app;
