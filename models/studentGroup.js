module.exports = (sequelize, DataTypes) => {
    const StudentGroup = sequelize.define('StudentGroup', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    StudentGroup.associate = (models) => {
        StudentGroup.hasMany(models.Student, {
            foreignKey: 'groupId',
            as: 'students'
        });
    };

    return StudentGroup;
};
