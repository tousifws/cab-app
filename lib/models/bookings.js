module.exports = (sequelize, DataTypes) => {
    const bookings = sequelize.define(
        'bookings',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isIn: [['completed', 'canceled', 'inTransit']]
                }
            },
            initialLocation: {
                type: DataTypes.GEOMETRY('POINT', 4326),
                allowNull: false
            },
            finalLocation: {
                type: DataTypes.GEOMETRY('POINT', 4326),
                allowNull: false
            },
            amount: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            userId: {
                field: 'user_id',
                type: DataTypes.INTEGER,
                allowNull: false,
                index: true,
                references: {
                    model: 'users',
                    key: 'id'
                }
            },
            carId: {
                field: 'car_id',
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'cars',
                    key: 'id'
                }
            }
        },
        {
            tableName: 'bookings',
            timestamps: true,
            hooks: {
                beforeValidate(booking) {
                    // coordinates : [ longitude , latitude ]
                    if (booking.initialLocation) {
                        booking.initialLocation = {
                            type: 'POINT',
                            coordinates: [
                                booking.initialLocation[1],
                                booking.initialLocation[0]
                            ]
                        };
                    }
                    if (booking.finalLocation) {
                        booking.finalLocation = {
                            type: 'POINT',
                            coordinates: [
                                booking.finalLocation[1],
                                booking.finalLocation[0]
                            ]
                        };
                    }
                }
            }
        }
    );

    return bookings;
};
