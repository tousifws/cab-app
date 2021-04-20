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
                location: 'POINT(-122.35900 47.65129)',
                user_id: 1
            },
            {
                model: 'Tesla Model 3',
                type: 'sedan',
                status: 'open',
                registration_no: 'IN001 4579',
                location: 'POINT(-122.35900 47.65129)',
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
