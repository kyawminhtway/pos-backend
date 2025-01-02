const up = async (queryInterface, Sequelize) => {
  await queryInterface.bulkInsert('app_user_role', [
    {
      name: 'Super Administrator',
      code: 'SUPERADMIN',
    },
    {
      name: 'Sales Person',
      code: 'SALESPERSON',
    }
  ]);
};

const down = async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete('app_user_role', { 
    code: {
      [Sequelize.Op.in]: [
        'SUPERADMIN',
      ]
    }}
  );
};

export default { 
  up, 
  down 
};