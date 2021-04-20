module.exports = {
    up: queryInterface => {
        const arr = [
            {
                first_name: 'Sharan',
                last_name: 'Salian',
                email: 'sharan@wednesday.is',
                oauth_client_id: 1
            },
            {
                first_name: 'mac',
                last_name: 'mac',
                email: 'mac@wednesday.is',
                oauth_client_id: 2
            },
            {
                first_name: 'Bill',
                last_name: 'Gates',
                email: 'bill@gates.io',
                oauth_client_id: 3
            },
            {
                first_name: 'Elon',
                last_name: 'Mask',
                email: 'elon@musk.io',
                oauth_client_id: 4
            }
        ];
        return queryInterface.bulkInsert('users', arr, {});
    },
    down: queryInterface => queryInterface.bulkDelete('users', null, {})
};
