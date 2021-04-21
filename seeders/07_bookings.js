module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
         * Add seed commands here.
         */
        const data = [
            {
                status: 'completed',
                initial_location: Sequelize.fn(
                    'ST_GeomFromText',
                    'POINT(18.477069188414504 73.89701187450872)',
                    4326
                ),
                final_location: Sequelize.fn(
                    'ST_GeomFromText',
                    'POINT(73.8889958534386 18.469788373672312)',
                    4326
                ),
                amount: 100,
                car_id: 2,
                user_id: 3
            },
            {
                status: 'completed',
                initial_location: Sequelize.fn(
                    'ST_GeomFromText',
                    'POINT(52.458415 16.904740)',
                    4326
                ),
                final_location: Sequelize.fn(
                    'ST_GeomFromText',
                    'POINT(52.458415 16.904740)',
                    4326
                ),
                amount: 200,
                car_id: 3,
                user_id: 4
            }
        ];
        await queryInterface.bulkInsert('bookings', data, {});
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         */
        await queryInterface.bulkDelete('bookings', null, {});
    }
};
