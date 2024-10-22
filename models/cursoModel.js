let cursos = [
  { id: 1, nombre: 'Programacion', estudiantes: [], profesores: [] },
  { id: 2, nombre: 'Calculo', estudiantes: [], profesores: [] }
];

let nextIdCurso = 3;

exports.findAll = () => cursos;

exports.findById = (id) => cursos.find(c => c.id == id) || null;

exports.add = (data) => {
  const curso = {
    id: nextIdCurso++,
    nombre: data.nombre,
    estudiantes: [],
    profesores: []
  };
  cursos.push(curso);
  return curso;
};

exports.save = (id, data) => {
  const curso = exports.findById(id);
  if (curso) {
    Object.assign(curso, data);
    return curso;
  }
  return null;
};

exports.erase = (id) => {
  const index = cursos.findIndex(c => c.id == id);
  if (index !== -1) {
    cursos.splice(index, 1);
    return true;
  }
  return false;
};

exports.agregarEstudiante = (curso, estudianteId) => {
  if (!curso.estudiantes.includes(estudianteId)) {
    curso.estudiantes.push(estudianteId);
  }
};

exports.eliminarEstudiante = (curso, estudianteId) => {
  const index = curso.estudiantes.indexOf(estudianteId);
  if (index !== -1) {
    curso.estudiantes.splice(index, 1);
  }
};

exports.agregarProfesor = (curso, profesorId) => {
  if (!curso.profesores.includes(profesorId)) {
    curso.profesores.push(profesorId);
  }
};
exports.eliminarProfesor = (curso, profesorId) => {
  if (curso && Array.isArray(curso.profesores)) {
    const index = curso.profesores.indexOf(profesorId);
    if (index !== -1) {
      curso.profesores.splice(index, 1);
      return true;
    }
  }
  return false;
};