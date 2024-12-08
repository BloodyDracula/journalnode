const db = require('../models');

// Получить всех преподавателей
const getAllTeachers = async (req, res) => {
    try {
        const teachers = await db.Teacher.findAll();
        res.status(200).json(teachers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Создать нового преподавателя
const createTeacher = async (req, res) => {
    try {
        const { name, email, subject } = req.body;

        if (!name || !email || !subject) {
            return res.status(400).json({ error: "Все поля (name, email, subject) обязательны" });
        }

        const teacher = await db.Teacher.create({ name, email, subject });
        res.status(201).json(teacher);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Получить преподавателя по ID
const getTeacherById = async (req, res) => {
    try {
        const { id } = req.params;
        const teacher = await db.Teacher.findByPk(id);

        if (!teacher) {
            return res.status(404).json({ error: "Преподаватель не найден" });
        }

        res.status(200).json(teacher);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Обновить преподавателя по ID
const updateTeacher = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, subject } = req.body;

        const teacher = await db.Teacher.findByPk(id);

        if (!teacher) {
            return res.status(404).json({ error: "Преподаватель не найден" });
        }

        await teacher.update({ name, email, subject });
        res.status(200).json(teacher);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Удалить преподавателя по ID
const deleteTeacher = async (req, res) => {
    try {
        const { id } = req.params;

        const teacher = await db.Teacher.findByPk(id);

        if (!teacher) {
            return res.status(404).json({ error: "Преподаватель не найден" });
        }

        await teacher.destroy();
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllTeachers,
    createTeacher,
    getTeacherById,
    updateTeacher,
    deleteTeacher
};
