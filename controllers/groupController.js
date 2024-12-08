const db = require('../models');

// Получить все группы студентов
const getAllGroups = async (req, res) => {
    try {
        const groups = await db.StudentGroup.findAll();
        res.status(200).json(groups);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Создать новую группу студентов (по желанию)
const createGroup = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ error: "Поле 'name' обязательно для заполнения" });
        }

        const group = await db.StudentGroup.create({ name });
        res.status(201).json(group);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllGroups,
    createGroup
};
