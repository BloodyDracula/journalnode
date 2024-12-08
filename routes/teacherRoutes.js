const express = require('express');
const router = express.Router();
const teacherController  = require('../controllers/teacherController');
const {getAllTeachers, createTeacher, getTeacherById, updateTeacher, deleteTeacher} = require("../controllers/teacherController");
const { authenticate, authorize } = require('../middleware/authMiddleware');

// Только для авторизованных пользователей
router.get('/', authenticate, teacherController.getAllTeachers);

// Только для администратора или учителя
router.post('/', authenticate, authorize(['admin', 'teacher']), teacherController.createTeacher);
// Маршрут для получения всех преподавателей
router.get('/', getAllTeachers);

// Маршрут для создания нового преподавателя
router.post('/', createTeacher);

// Маршрут для получения преподавателя по ID
router.get('/:id', getTeacherById);

// Маршрут для обновления преподавателя по ID
router.put('/:id', updateTeacher);

// Маршрут для удаления преподавателя по ID
router.delete('/:id', deleteTeacher);

module.exports = router;
