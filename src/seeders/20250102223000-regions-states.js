const STATES_AND_REGIONS = [
    'Kachin State',
    'Kayah State',
    'Kayin State',
    'Chin State',
    'Mon State',
    'Rakhine State',
    'Shan State',
    'Yangon Region',
    'Mandalay Region',
    'Ayeyarwaddy Region',
    'Bago Region',
    'Magway Region',
    'Sagaing Region',
    'Tanintharyi Region',
];

const up = async (queryInterface, Sequelize) => {
    const current = new Date();
    await queryInterface.bulkInsert('region_state', 
        STATES_AND_REGIONS.map(name => (
            { name, createdAt: current, updatedAt: current }
        ))
    );
};

const down = async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('app_user', {
        name: STATES_AND_REGIONS
    });
};

export default { up, down };


