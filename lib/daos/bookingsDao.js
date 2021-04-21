import { bookings, Sequelize } from 'models';

export const createOneBooking = async ({
    carId,
    userId,
    initialLocation,
    finalLocation,
    amount
}) => {
    initialLocation = Sequelize.fn(
        'ST_GeomFromText',
        `POINT(${initialLocation[1]} ${initialLocation[0]})`,
        4326
    );
    finalLocation = Sequelize.fn(
        'ST_GeomFromText',
        `POINT(${finalLocation[1]} ${finalLocation[0]})`,
        4326
    );

    return bookings.create({
        carId,
        userId,
        initialLocation,
        finalLocation,
        amount
    });
};

export const findAllBookings = async (page, limit) => {
    const where = {};
    const totalBookingsPromise = bookings.count({ where });
    const allBookingsPromise = bookings.findAll({
        where,
        offset: (page - 1) * limit,
        limit
    });

    const [totalCount, allBookings] = await Promise.all([
        totalBookingsPromise,
        allBookingsPromise
    ]);

    return { totalCount, allBookings };
};

export const findAllBookingsOfUser = async userId => {
    const where = { userId: parseInt(userId, 10) };
    const totalBookingsPromise = bookings.count({ where });
    const allBookingsPromise = bookings.findAll({
        where
    });

    const [totalCount, allBookings] = await Promise.all([
        totalBookingsPromise,
        allBookingsPromise
    ]);

    return { allBookings, totalCount };
};
