const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Маршрут для регистрации
router.post('/register', authController.register);

// Маршрут для входа
router.post('/login', authController.login);

module.exports = router;
