const express = require('express');
const router = express.Router();

const estudiantesRoutes = require('./estudiantes');
const profesoresRoutes = require('./profesores');
const cursosRoutes = require('./cursos');

router.use('/estudiantes', estudiantesRoutes);
router.use('/profesores', profesoresRoutes);
router.use('/cursos', cursosRoutes);

module.exports = router;