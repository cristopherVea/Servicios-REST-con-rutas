const Profesor = require('../models/profesorModel');
const Curso = require('../models/cursoModel');

exports.getAllProfesores = (req, res) => {
    const profesores = Profesor.findAll();
    res.json(profesores);
};

exports.getProfesor = (req, res) => {
    const profesor = Profesor.findById(req.params.id);
    if (profesor) {
        res.json(profesor);
    } else {
        res.status(404).json({ error: 'Profesor no encontrado' });
    }
};

exports.createProfesor = (req, res) => {
    const nuevoProfesor = Profesor.add(req.body);
    res.status(201).json(nuevoProfesor);
};

exports.updateProfesor = (req, res) => {
    const profesorActualizado = Profesor.save(req.params.id, req.body);
    if (profesorActualizado) {
        res.json(profesorActualizado);
    } else {
        res.status(404).json({ error: 'Profesor no encontrado' });
    }
};

exports.deleteProfesor = (req, res) => {
    if (Profesor.erase(req.params.id)) {
        res.json({ message: 'Profesor eliminado con éxito' });
    } else {
        res.status(404).json({ error: 'Profesor no encontrado' });
    }
};

exports.asociarACurso = (req, res) => {
    const profesorId = parseInt(req.params.id);
    const cursoId = parseInt(req.params.cursoId);
    
    const profesor = Profesor.findById(profesorId);
    const curso = Curso.findById(cursoId);

    if (!profesor) {
        return res.status(404).json({ error: 'Profesor no encontrado' });
    }

    if (!curso) {
        return res.status(404).json({ error: 'Curso no encontrado' });
    }

    if (Profesor.asociarACurso(profesorId, cursoId)) {
        Curso.agregarProfesor(curso, profesorId);
        res.status(200).json({ 
            mensaje: 'Profesor asociado al curso con éxito',
            profesor: profesor,
            curso: curso
        });
    } else {
        res.status(500).json({ error: 'No se pudo asociar el profesor al curso' });
    }
};

exports.eliminarDeCurso = (req, res) => {
    const profesorId = parseInt(req.params.id);
    const cursoId = parseInt(req.params.cursoId);

    const profesor = Profesor.findById(profesorId);
    const curso = Curso.findById(cursoId);

    if (!profesor) {
        return res.status(404).json({ error: 'Profesor no encontrado' });
    }

    if (!curso) {
        return res.status(404).json({ error: 'Curso no encontrado' });
    }

    if (Profesor.eliminarDeCurso(profesorId, cursoId)) {
        Curso.eliminarProfesor(curso, profesorId);
        res.json({ mensaje: 'Profesor eliminado del curso con éxito' });
    } else {
        res.status(404).json({ error: 'Profesor no estaba asociado a este curso' });
    }
};

exports.getCursosProfesor = (req, res) => {
    const profesor = Profesor.findById(req.params.id);
    if (!profesor) {
        return res.status(404).json({ error: 'Profesor no encontrado' });
    }

    try {
        const cursos = Profesor.getCursos(profesor);
        res.json(cursos);
    } catch (error) {
        console.error('Error al obtener cursos del profesor:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

exports.getEstudiantesProfesor = (req, res) => {
    const profesor = Profesor.findById(req.params.id);
    if (!profesor) {
        return res.status(404).json({ error: 'Profesor no encontrado' });
    }

    try {
        const estudiantes = Profesor.getEstudiantes(profesor);
        res.json(estudiantes);
    } catch (error) {
        console.error('Error al obtener estudiantes del profesor:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};