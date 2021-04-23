import { users } from 'models';
import { badRequest } from 'utils/responseInterceptors';

const attributes = [
    'id',
    'first_name',
    'last_name',
    'email',
    'oauth_client_id'
];

export const findOneUser = async userId =>
    users.findOne({
        attributes,
        where: {
            id: userId
        },
        underscoredAll: false
    });

export const findAllUser = async (page, limit) => {
    const where = {};
    const totalCount = await users.count({ where });
    const allUsers = await users.findAll({
        attributes,
        where,
        offset: (page - 1) * limit,
        limit
    });
    return { allUsers, totalCount };
};

export const createUser = async (data, transaction) => {
    const { firstName, lastName, email } = data;
    // check if user account already exists in the db
    const existingUser = await users.findOne({ where: { email } });
    if (existingUser) {
        return badRequest('An account with that email is already exist');
    }

    const newUser = await users.create(
        {
            firstName,
            lastName,
            email
        },
        { transaction }
    );

    return {
        user: newUser
    };
};
