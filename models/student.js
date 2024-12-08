module.exports = (sequelize, DataTypes) => {
    const Student = sequelize.define('Student', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        groupId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'StudentGroups', // Здесь указываем, что этот внешний ключ ссылается на таблицу StudentGroups
                key: 'id'
            }
        }
    });

    Student.associate = (models) => {
        Student.belongsTo(models.StudentGroup, {
            foreignKey: 'groupId',
            as: 'group',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        });
    };

    return Student;
};
