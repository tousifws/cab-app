module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
         * Add seed commands here.
         */
        const data = [
            {
                model: 'Tesla Model S',
                type: 'sedan',
                status: 'open',
                registration_no: 'IN001 4589',
                location: Sequelize.fn(
                    'ST_GeomFromText',
                    'POINT(52.458415 16.904740)',
                    4326
                ),
                user_id: 1
            },
            {
                model: 'Tesla Model 3',
                type: 'sedan',
                status: 'open',
                registration_no: 'IN001 4579',
                location: Sequelize.fn(
                    'ST_GeomFromText',
                    'POINT(52.458415 16.904740)',
                    4326
                ),
                user_id: 2
            }
        ];
        await queryInterface.bulkInsert('cars', data, {});
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         */
        await queryInterface.bulkDelete('cars', null, {});
    }
};
