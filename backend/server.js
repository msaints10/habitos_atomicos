require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const habitosRouter = require('./routes/habitos');
const path = require('path');

const app = express();

// Configurar motor de vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(cors());

// Rutas
app.get('/', (req, res) => {
    res.render('index');
});
app.use('/api/habitos', habitosRouter);

// Conexión a MongoDB
connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});

module.exports = app;
