const express = require('express');
const router = express.Router();
const estudiantesController = require('../controllers/estudiantesController');

router.get('/', estudiantesController.getAllEstudiantes);
router.get('/:id', estudiantesController.getEstudiante);
router.post('/', estudiantesController.createEstudiante);
router.put('/:id', estudiantesController.updateEstudiante);
router.patch('/:id', estudiantesController.updateEstudiante);
router.delete('/:id', estudiantesController.deleteEstudiante);

router.post('/:id/cursos/:cursoId', estudiantesController.inscribirEnCurso);
router.delete('/:id/cursos/:cursoId', estudiantesController.eliminarDeCurso);
router.get('/:id/cursos', estudiantesController.getCursosEstudiante);
router.get('/:id/profesores', estudiantesController.getProfesoresEstudiante);

module.exports = router;