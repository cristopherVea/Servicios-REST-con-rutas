const Estudiante = require('../models/estudianteModel');
const Curso = require('../models/cursoModel');

exports.getAllEstudiantes = (req, res) => {
  const estudiantes = Estudiante.findAll();
  res.json(estudiantes);
};

exports.getEstudiante = (req, res) => {
  const estudiante = Estudiante.findById(req.params.id);
  if (estudiante) {
    res.json(estudiante);
  } else {
    res.status(404).json({ error: 'Estudiante no encontrado' });
  }
};

exports.createEstudiante = (req, res) => {
  const nuevoEstudiante = Estudiante.add(req.body);
  res.status(201).json(nuevoEstudiante);
};

exports.updateEstudiante = (req, res) => {
  const estudianteActualizado = Estudiante.save(req.params.id, req.body);
  if (estudianteActualizado) {
    res.json(estudianteActualizado);
  } else {
    res.status(404).json({ error: 'Estudiante no encontrado' });
  }
};

exports.deleteEstudiante = (req, res) => {
  if (Estudiante.erase(req.params.id)) {
    res.json({ mensaje: 'Estudiante eliminado con éxito' });
  } else {
    res.status(404).json({ error: 'Estudiante no encontrado' });
  }
};

exports.inscribirEnCurso = (req, res) => {
  const estudianteId = req.params.id;
  const cursoId = req.params.cursoId;
  const estudiante = Estudiante.findById(estudianteId);
  const curso = Curso.findById(cursoId);

  if (estudiante && curso) {
    Estudiante.inscribirEnCurso(estudiante, cursoId);
    Curso.agregarEstudiante(curso, estudianteId);
    res.status(200).json({ mensaje: 'Estudiante inscrito en el curso', estudiante });
  } else {
    res.status(404).json({ mensaje: 'Estudiante o curso no encontrado' });
  }
};

exports.eliminarDeCurso = (req, res) => {
  const estudianteId = req.params.id;
  const cursoId = req.params.cursoId;
  const estudiante = Estudiante.findById(estudianteId);
  const curso = Curso.findById(cursoId);

  if (estudiante && curso) {
    Estudiante.eliminarDeCurso(estudiante, cursoId);
    Curso.eliminarEstudiante(curso, estudianteId);
    res.json({ mensaje: 'Estudiante eliminado del curso con éxito' });
  } else {
    res.status(404).json({ error: 'Estudiante o curso no encontrado' });
  }
};

exports.getCursosEstudiante = (req, res) => {
  const estudiante = Estudiante.findById(req.params.id);
  if (estudiante) {
    const cursos = Estudiante.getCursos(estudiante);
    res.json(cursos);
  } else {
    res.status(404).json({ error: 'Estudiante no encontrado' });
  }
};

exports.getProfesoresEstudiante = (req, res) => {
  const estudiante = Estudiante.findById(req.params.id);
  if (estudiante) {
    const profesores = Estudiante.getProfesores(estudiante);
    res.json(profesores);
  } else {
    res.status(404).json({ error: 'Estudiante no encontrado' });
  }
};