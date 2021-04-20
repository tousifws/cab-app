import { createOneCar, findOneCar } from 'daos/carDao';
import { badRequest, notFound } from 'utils/responseInterceptors';
import Joi from '@hapi/joi';
import db from '../../models';

module.exports = [
    {
        method: 'POST',
        path: '/',
        options: {
            description: 'crate a car',
            notes: 'Create cars API',
            tags: ['api', 'cars'],
            cors: true,
            auth: true,
            validate: {
                payload: Joi.object({
                    model: Joi.string().required(),
                    status: Joi.string().optional(),
                    registrationNo: Joi.string().required(),
                    location: Joi.array(),
                    type: Joi.string(),
                    userId: Joi.number()
                })
            }
        },
        handler: async request => {
            try {
                const {
                    model,
                    status,
                    registrationNo,
                    location,
                    type,
                    userId
                } = request.payload;

                const newCar = await createOneCar({
                    model,
                    status,
                    registrationNo,
                    location,
                    type,
                    userId
                });

                return {
                    data: newCar
                };
            } catch (error) {
                console.log(error);
                badRequest(error.message);
            }
        }
    },
    {
        method: 'GET',
        path: '/{carId}',
        options: {
            description: 'get one car by ID',
            notes: 'GET cars API',
            tags: ['api', 'cars'],
            cors: true,
            auth: false
        },
        handler: async request => {
            const { carId } = request.params;
            const car = await findOneCar(carId);
            if (!car) {
                return notFound(`No user was found for id ${carId}`);
            }
        }
    },
    {
        method: 'GET',
        path: '/near-by',
        options: {
            description: 'get near by cars',
            notes: 'GET cars API',
            tags: ['api', 'cars'],
            cors: true,
            auth: false
        },
        handler: async request => {
            const { lng, lat } = request.query;
            const longitude = parseFloat(lng);
            const latitude = parseFloat(lat);
            const location = `ST_GeomFromText('POINT(${longitude} ${latitude})', 4326)`;
            // results are returned in meters
            const nearByCars = await db.sequelize.query(
                `SELECT id, model, location, type, status, ST_Distance_Sphere(
                    ${location},
                    location
                ) AS distance 
                FROM cars
                WHERE status = 'open'
                order by distance ASC
                LIMIT 5;`
            );

            return { nearByCars };
        }
    },
    {
        method: 'GET',
        path: '/',
        options: {
            description: 'get all cars',
            notes: 'GET cars API',
            tags: ['api', 'cars'],
            auth: false,
            plugins: {
                pagination: {
                    enabled: true
                },
                query: {
                    pagination: true
                }
            }
        },
        handler: async (request, h) => {
            // const { page, limit } = request.query;
            // console.log(page, limit);
            // return [
            //     {
            //         success: 'success'
            //     }
            // ];
        }
    }
];
