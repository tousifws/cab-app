module.exports = function(sequelize, DataTypes) {
    return sequelize.define(
        'users',
        {
            id: {
                type: DataTypes.INTEGER(11),
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            firstName: {
                field: 'first_name',
                type: DataTypes.STRING(32),
                allowNull: false
            },
            lastName: {
                field: 'last_name',
                type: DataTypes.STRING(32),
                allowNull: false
            },
            email: {
                type: DataTypes.STRING(32),
                allowNull: false
            },
            password: {
                type: DataTypes.STRING
            },
            createdAt: {
                field: 'created_at',
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
            }
        },
        {
            tableName: 'users',
            timestamps: false
        }
    );
};
