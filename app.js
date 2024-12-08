const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');
const studentRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const groupRoutes = require('./routes/groupRoutes');  // Импортируем маршруты групп студентов
const authRoutes = require('./routes/authRoutes');  // Добавим маршруты для авторизации


const app = express();

app.use(bodyParser.json());

// CORS настройки для фронтенда
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

// Маршруты для студентов
app.use('/students', studentRoutes);

// Маршруты для преподавателей
app.use('/teachers', teacherRoutes);

// Маршруты для групп студентов
app.use('/groups', groupRoutes);  // Используем маршруты групп студентов

// Маршруты для авторизации
app.use('/api', authRoutes);

const PORT = process.env.PORT || 3000;

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
