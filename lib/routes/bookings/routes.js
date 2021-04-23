import {
    notFound,
    badImplementation,
    badData
} from 'utils/responseInterceptors';
import {
    findAllBookings,
    findAllBookingsOfUser,
    createOneBooking
} from 'daos/bookingsDao';
import { transformDbArrayResponseToRawResponse } from 'utils/transformerUtils';
import Joi from '@hapi/joi';

module.exports = [
    {
        method: 'POST',
        path: '/',
        options: {
            description: 'create a booking',
            notes: 'POST bookings API',
            tags: ['api', 'bookings'],
            cors: true,
            validate: {
                payload: Joi.object({
                    car_id: Joi.number().required(),
                    initial_location: Joi.array().required(),
                    final_location: Joi.array().required(),
                    amount: Joi.number().required(),
                    status: Joi.string().optional()
                }).options({
                    stripUnknown: true
                })
            }
        },
        handler: async request => {
            try {
                const {
                    carId,
                    initialLocation,
                    finalLocation,
                    amount
                } = request.payload;
                const { id } = request.auth.artifacts.scope;
                const bookings = await createOneBooking({
                    carId,
                    userId: id,
                    initialLocation,
                    finalLocation,
                    amount
                });
                return { data: bookings };
            } catch (error) {
                return badData(error.message);
            }
        }
    },
    {
        method: 'GET',
        path: '/{userId}',
        options: {
            description: 'get all bookings of a user by userId',
            notes: 'GET bookings API',
            tags: ['api', 'bookings'],
            cors: true
        },
        handler: async request => {
            try {
                const userId = request.params.userId;

                const bookings = await findAllBookingsOfUser(userId);
                return { data: bookings };
            } catch (error) {
                console.log(error);
            }
        }
    },
    {
        method: 'GET',
        path: '/',
        options: {
            description: 'get all bokings',
            notes: 'GET bookings API',
            tags: ['api', 'bookings'],
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
                const bookings = await findAllBookings(page, limit);
                if (bookings.allBookings.length) {
                    const totalCount = bookings.totalCount;
                    const allBookings = transformDbArrayResponseToRawResponse(
                        bookings.allBookings
                    ).map(booking => booking);

                    return h.response({
                        results: allBookings,
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
