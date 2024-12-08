const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');

// Маршрут для получения всех групп студентов
router.get('/', groupController.getAllGroups);

// Маршрут для создания новой группы студентов (по желанию)
router.post('/', groupController.createGroup);

module.exports = router;
