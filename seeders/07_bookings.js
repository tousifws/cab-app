module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
         * Add seed commands here.
         */
        const data = [
            {
                model: 'Tesla Model S',
                status: 'open',
                initial_location: "GeomFromText('POINT(-122.35900 47.65129)')",
                final_location: "GeomFromText('POINT(-122.35900 47.65129)')",
                amount: 200,
                car_id: 1,
                user_id: 3
            },
            {
                model: 'Tesla Model 3',
                type: 'sedan',
                initial_location: "GeomFromText('POINT(-122.35900 47.65129)')",
                final_location: "GeomFromText('POINT(-122.35900 47.65129)')",
                amount: 100,
                car_id: 2,
                user_id: 4
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
