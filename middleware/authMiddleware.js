const jwt = require('jsonwebtoken');

// Проверка токена
const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Токен не предоставлен' });
    }

    try {
        const decoded = jwt.verify(token, 'SECRET_KEY');
        req.user = decoded; // Добавляем данные пользователя к запросу
        next();
    } catch (error) {
        res.status(403).json({ error: 'Неверный токен' });
    }
};

// Проверка роли пользователя
const authorize = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Доступ запрещен' });
        }
        next();
    };
};

module.exports = {
    authenticate,
    authorize
};
