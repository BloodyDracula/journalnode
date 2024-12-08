const db = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Регистрация пользователя
const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Проверка, что все поля заполнены
        if (!name || !email || !password || !role) {
            return res.status(400).json({ error: 'Все поля обязательны для заполнения' });
        }

        // Хешируем пароль
        const hashedPassword = await bcrypt.hash(password, 10);

        // Создаем пользователя
        const newUser = await db.User.create({ name, email, password: hashedPassword, role });

        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Логин пользователя
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Находим пользователя по email
        const user = await db.User.findOne({ where: { email } });

        if (!user) {
            console.log('Проверяем пользователя:', email);
            console.log('Найденный пользователь:', user);

            console.log('Пользователь с таким email не найден');
            return res.status(400).json({ error: 'Неверный email или пароль' });
        }


        // Проверяем пароль
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Неверный email или пароль' });
        }

        // Генерация JWT токена
        const token = jwt.sign({ id: user.id, role: user.role }, 'SECRET_KEY', { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    register,
    login
};
