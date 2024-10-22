const Curso = require('./cursoModel');
const Estudiante = require('./estudianteModel');

let profesores = [
    {
        id: 1,
        nombre: 'Juan Carlos',
        cursos: []
    },
    {
        id: 2,
        nombre: 'Maria',
        cursos: []
    }
];

let nextIdProfesor = 3;

// Funciones auxiliares
const getCursos = (profesor) => {
    return profesor.cursos.map(cursoId => Curso.findById(cursoId)).filter(Boolean);
};

const getEstudiantes = (profesor) => {
    const estudiantes = new Set();
    getCursos(profesor).forEach(curso => {
        if (curso && curso.estudiantes) {
            curso.estudiantes.forEach(estudianteId => {
                const estudiante = Estudiante.findById(estudianteId);
                if (estudiante) estudiantes.add(estudiante);
            });
        }
    });
    return Array.from(estudiantes);
};

const asociarACurso = (profesor, cursoId) => {
    if (!profesor.cursos.includes(cursoId)) {
        profesor.cursos.push(cursoId);
    }
};

const eliminarDeCurso = (profesor, cursoId) => {
    const index = profesor.cursos.indexOf(cursoId);
    if (index !== -1) {
        profesor.cursos.splice(index, 1);
    }
};

// Funciones exportadas
exports.findAll = () => profesores;

exports.findById = (id) => {
    const profesor = profesores.find(p => p.id === parseInt(id));
    if (profesor && !profesor.cursos) {
        profesor.cursos = [];
    }
    return profesor || null;
};

exports.add = (data) => {
    const nuevoProfesor = {
        id: nextIdProfesor++,
        nombre: data.nombre,
        cursos: []
    };
    profesores.push(nuevoProfesor);
    return nuevoProfesor;
};

exports.save = (id, data) => {
    const profesor = exports.findById(id);
    if (profesor) {
        Object.assign(profesor, { ...data, cursos: profesor.cursos });
        return profesor;
    }
    return null;
};

exports.erase = (id) => {
    const index = profesores.findIndex(p => p.id == id);
    if (index !== -1) {
        profesores.splice(index, 1);
        return true;
    }
    return false;
};

exports.asociarACurso = (profesorId, cursoId) => {
    const profesor = exports.findById(profesorId);
    if (profesor) {
        asociarACurso(profesor, cursoId);
        return true;
    }
    return false;
};

exports.eliminarDeCurso = (profesorId, cursoId) => {
    const profesor = exports.findById(profesorId);
    if (profesor) {
        eliminarDeCurso(profesor, cursoId);
        return true;
    }
    return false;
};

exports.getCursos = getCursos;
exports.getEstudiantes = getEstudiantes;