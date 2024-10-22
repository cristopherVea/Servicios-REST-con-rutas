const express = require('express');
const app = express();
const port = 4009;
const router = require('./routes/index');
const cors = require("cors");
app.use(cors());

// Add this line to parse JSON bodies
app.use(express.json());

// Use the router
app.use(router);

app.listen(port, () => {
    console.log('Servidor escuchando por el puerto:', port);
}).on('error', err => {
    console.log('Error al iniciar el servidor:', err);
});