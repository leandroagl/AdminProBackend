require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');
// Esta es la manera de importar siempre en node

// Respetar este orden
// Crear servidor express
const app = express();

// Configurar CORS
app.use( cors() );

// Lectura y parseo del body
app.use( express.json() );

// Base de datos
dbConnection();

// Rutas
app.use('/api/usuarios', require('./routes/usuarios'));

// Rutas, get del /


// MEAN_USER
// 4YJfc8DkfA7GZ7le

app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en puerto' + process.env.PORT)
});
