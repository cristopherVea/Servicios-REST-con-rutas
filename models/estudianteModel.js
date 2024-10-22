const Curso = require('./cursoModel');
const Profesor = require('./profesorModel');

let estudiantes = [
  { id: 1, nombre: 'Juan Camaney', matricula: 123456, semestreIngreso: '2016-2', creditosCursados: 200, cursos: [], profesores: [] },
  { id: 2, nombre: 'Lupita López', matricula: 654321, semestreIngreso: '2017-2', creditosCursados: 100, cursos: [], profesores: [] }
];

let nextId = 3;

exports.findAll = () => estudiantes;

exports.findById = (id) => estudiantes.find(e => e.id == id) || null;

exports.add = (data) => {
  const estudiante = {
    id: nextId++,
    nombre: data.nombre,
    matricula: data.matricula,
    semestreIngreso: data.semestreIngreso,
    creditosCursados: data.creditosCursados,
    cursos: [],
    profesores: []
  };
  estudiantes.push(estudiante);
  return estudiante;
};

exports.save = (id, data) => {
  const estudiante = exports.findById(id);
  if (estudiante) {
    Object.assign(estudiante, data);
    return estudiante;
  }
  return null;
};

exports.erase = (id) => {
  const index = estudiantes.findIndex(e => e.id == id);
  if (index !== -1) {
    estudiantes.splice(index, 1);
    return true;
  }
  return false;
};

exports.inscribirEnCurso = (estudiante, cursoId) => {
  if (!estudiante.cursos.includes(cursoId)) {
    estudiante.cursos.push(cursoId);
  }
};

exports.eliminarDeCurso = (estudiante, cursoId) => {
  const index = estudiante.cursos.indexOf(cursoId);
  if (index !== -1) {
    estudiante.cursos.splice(index, 1);
  }
};

exports.getCursos = (estudiante) => {
  return estudiante.cursos.map(cursoId => Curso.findById(cursoId)).filter(Boolean);
};

exports.getProfesores = (estudiante) => {
  const profesores = new Set();
  exports.getCursos(estudiante).forEach(curso => {
    curso.profesores.forEach(profesorId => {
      const profesor = Profesor.findById(profesorId);
      if (profesor) profesores.add(profesor);
    });
  });
  return Array.from(profesores);
};