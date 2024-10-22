const express = require('express');
const router = express.Router();
const cursosController = require('../controllers/cursosController');

router.get('/', cursosController.getAllCursos);
router.get('/:id', cursosController.getCurso);
router.post('/', cursosController.createCurso);
router.put('/:id', cursosController.updateCurso);
router.patch('/:id', cursosController.updateCurso);
router.delete('/:id', cursosController.deleteCurso);

module.exports = router;