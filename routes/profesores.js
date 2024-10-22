const express = require('express');
const router = express.Router();
const profesoresController = require('../controllers/profesoresController');

router.get('/', profesoresController.getAllProfesores);
router.get('/:id', profesoresController.getProfesor);
router.post('/', profesoresController.createProfesor);
router.put('/:id', profesoresController.updateProfesor);
router.patch('/:id', profesoresController.updateProfesor);
router.delete('/:id', profesoresController.deleteProfesor);


router.post('/:id/cursos/:cursoId', profesoresController.asociarACurso);
router.delete('/:id/cursos/:cursoId', profesoresController.eliminarDeCurso);
router.get('/:id/cursos', profesoresController.getCursosProfesor);
router.get('/:id/estudiantes', profesoresController.getEstudiantesProfesor);

module.exports = router;
