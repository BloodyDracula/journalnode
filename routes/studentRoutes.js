const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

// Только для авторизованных пользователей
router.get('/', authenticate, studentController.getAllStudents);

// Только для администратора
router.post('/', authenticate, authorize(['admin']), studentController.createStudent);

module.exports = router;
