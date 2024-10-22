const Curso = require('../models/cursoModel');

exports.getAllCursos = (req, res) => {
  const cursos = Curso.findAll();
  res.json(cursos);
};

exports.getCurso = (req, res) => {
  const curso = Curso.findById(req.params.id);
  if (curso) {
    res.json(curso);
  } else {
    res.status(404).json({ error: 'Curso no encontrado' });
  }
};

exports.createCurso = (req, res) => {
  const nuevoCurso = Curso.add(req.body);
  res.status(201).json(nuevoCurso);
};

exports.updateCurso = (req, res) => {
  const cursoActualizado = Curso.save(req.params.id, req.body);
  if (cursoActualizado) {
    res.json(cursoActualizado);
  } else {
    res.status(404).json({ error: 'Curso no encontrado' });
  }
};

exports.deleteCurso = (req, res) => {
  if (Curso.erase(req.params.id)) {
    res.json({ message: 'Curso eliminado con éxito' });
  } else {
    res.status(404).json({ error: 'Curso no encontrado' });
  }
};
