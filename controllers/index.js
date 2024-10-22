const express = require('express');
const router = express.Router();

const estudiantesController = require('./estudiantesController');
const profesoresController = require('../controllers/profesoresController');
const cursosController = require('./cursosController');

// Rutas para estudiantes
router.get('/estudiantes', estudiantesController.getAllEstudiantes);
router.get('/estudiantes/:id', estudiantesController.getEstudiante);
router.post('/estudiantes', estudiantesController.createEstudiante);
router.put('/estudiantes/:id', estudiantesController.updateEstudiante);
router.delete('/estudiantes/:id', estudiantesController.deleteEstudiante);

// Inscribir/Eliminar estudiantes en cursos
router.post('/estudiantes/:id/cursos/:cursoId', estudiantesController.inscribirEnCurso);
router.delete('/estudiantes/:id/cursos/:cursoId', estudiantesController.eliminarDeCurso);

// Rutas para profesores
router.get('/profesores', profesoresController.getAllProfesores);
router.get('/profesores/:id', profesoresController.getProfesor);
router.post('/profesores', profesoresController.createProfesor);
router.put('/profesores/:id', profesoresController.updateProfesor);
router.delete('/profesores/:id', profesoresController.deleteProfesor);

// Asociar/Eliminar profesor de cursos
router.post('/profesores/:id/cursos/:cursoId', profesoresController.asociarACurso);
router.delete('/profesores/:id/cursos/:cursoId', profesoresController.eliminarDeCurso);

// Rutas para cursos
router.get('/cursos', cursosController.getAllCursos);
router.get('/cursos/:id', cursosController.getCurso);
router.post('/cursos', cursosController.createCurso);
router.put('/cursos/:id', cursosController.updateCurso);
router.delete('/cursos/:id', cursosController.deleteCurso);

module.exports = router;
