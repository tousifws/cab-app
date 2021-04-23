import {
    createOneCar,
    findOneCar,
    findAllCar,
    getNearByCars
} from 'daos/carDao';
import {
    badRequest,
    notFound,
    badImplementation
} from 'utils/responseInterceptors';
import Joi from '@hapi/joi';
import { transformDbArrayResponseToRawResponse } from 'utils/transformerUtils';

module.exports = [
    {
        method: 'POST',
        path: '/',
        options: {
            description: 'create a car',
            notes: 'POST cars API',
            tags: ['api', 'cars'],
            cors: true,
            validate: {
                payload: Joi.object({
                    model: Joi.string().required(),
                    status: Joi.string().optional(),
                    registration_no: Joi.string().required(),
                    location: Joi.array(),
                    type: Joi.string()
                }).options({
                    stripUnknown: true
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
                    type
                } = request.payload;
                const { id } = request.auth.artifacts.scope;
                const newCar = await createOneCar({
                    model,
                    status,
                    registrationNo,
                    location,
                    type,
                    userId: id
                });

                return {
                    data: newCar
                };
            } catch (error) {
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
            try {
                const { lng, lat } = request.query;
                const nearByCars = await getNearByCars(lat, lng);
                return { data: nearByCars };
            } catch (error) {
                console.log(error);
                return badImplementation(error.message);
            }
        }
    },
    {
        method: 'GET',
        path: '/',
        options: {
            description: 'get all cars',
            notes: 'GET cars API',
            tags: ['api', 'cars'],
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
            try {
                const { page, limit } = request.query;
                const cars = await findAllCar(page, limit);
                if (cars.allCars.length) {
                    const totalCount = cars.totalCount;
                    const allCars = transformDbArrayResponseToRawResponse(
                        cars.allCars
                    ).map(car => car);

                    return h.response({
                        results: allCars,
                        totalCount
                    });
                }
                return notFound('No cars found');
            } catch (error) {
                return badImplementation(error.message);
            }
        }
    }
];
