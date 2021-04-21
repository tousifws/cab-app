import get from 'lodash/get';
import { notFound, badImplementation } from 'utils/responseInterceptors';
import { server } from 'root/server.js';
import { findAllUser, createUser } from 'daos/userDao';
import { transformDbArrayResponseToRawResponse } from 'utils/transformerUtils';
import Joi from '@hapi/joi';
import { hashPassword } from 'utils/passwordUtils';

module.exports = [
    {
        method: 'POST',
        path: '/signup',
        options: {
            description: 'User Sign up',
            notes: 'POST users API',
            tags: ['api', 'users'],
            cors: true,
            validate: {
                payload: Joi.object({
                    first_name: Joi.string().required(),
                    last_name: Joi.string().required(),
                    email: Joi.string().required(),
                    password: Joi.string().required()
                }).options({
                    stripUnknown: true
                })
            }
        },
        handler: async request => {
            try {
                const {
                    firstName,
                    lastName,
                    email,
                    password
                } = request.payload;

                const hashedPass = await hashPassword(password);

                const newUser = createUser({
                    firstName,
                    lastName,
                    email,
                    password: hashedPass
                });

                return {
                    data: newUser
                };
            } catch (error) {
                console.log(error);
            }
        }
    },
    {
        method: 'GET',
        path: '/{userId}',
        options: {
            description: 'get one user by ID',
            notes: 'GET users API',
            tags: ['api', 'users'],
            cors: true
        },
        handler: async request => {
            const userId = request.params.userId;
            return server.methods.findOneUser(userId).then(user => {
                if (!user) {
                    return notFound(`No user was found for id ${userId}`);
                }
                return user;
            });
        }
    },
    {
        method: 'GET',
        path: '/',
        handler: async (request, h) => {
            const { page, limit } = request.query;
            return findAllUser(page, limit)
                .then(users => {
                    if (get(users.allUsers, 'length')) {
                        const totalCount = users.totalCount;
                        const allUsers = transformDbArrayResponseToRawResponse(
                            users.allUsers
                        ).map(user => user);

                        return h.response({
                            results: allUsers,
                            totalCount
                        });
                    }
                    return notFound('No users found');
                })
                .catch(error => badImplementation(error.message));
        },
        options: {
            description: 'get all users',
            notes: 'GET users API',
            tags: ['api', 'users'],
            plugins: {
                pagination: {
                    enabled: true
                },
                query: {
                    pagination: true
                }
            }
        }
    }
];
