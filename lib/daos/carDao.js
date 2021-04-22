import { cars, Sequelize, sequelize } from 'models';

const attributes = ['id', 'model', 'status', 'type', 'location'];

export const createOneCar = async ({
    model,
    status,
    type,
    registrationNo,
    userId,
    location
}) => {
    // coordinates : [ longitude , latitude ]
    location = Sequelize.fn(
        'ST_GeomFromText',
        `POINT(${location[1]} ${location[0]})`,
        4326
    );
    const newCar = await cars.create({
        model,
        status,
        registrationNo,
        type,
        userId,
        location
    });

    return newCar;
};

export const findOneCar = async carId =>
    cars.findOne({
        attributes,
        where: {
            id: carId
        },
        underscoredAll: false
    });

export const findAllCar = async (page, limit) => {
    const where = {};
    const totalCountPromise = cars.count({ where });
    const allCarsPromise = cars.findAll({
        attributes,
        where,
        offset: (page - 1) * limit,
        limit
    });

    const [totalCount, allCars] = await Promise.all([
        totalCountPromise,
        allCarsPromise
    ]);

    return { allCars, totalCount };
};

export const getNearByCars = async (lat, lng) => {
    lng = parseFloat(lng);
    lat = parseFloat(lat);
    const location = `ST_GeomFromText('POINT(${lng} ${lat})', 4326)`;
    // results are returned in meters
    const nearByCars = await sequelize.query(
        `SELECT id, model, location, type, status, ST_Distance_Sphere(
            ${location},
            location
        ) AS distance
        FROM cars
        WHERE status = 'open'
        order by distance ASC
        LIMIT 5;`,
        {
            model: cars
        }
    );
    return nearByCars;
};
