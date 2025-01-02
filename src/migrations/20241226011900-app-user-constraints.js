const up = async (queryInterface, Sequelize) => {
  await queryInterface.addConstraint('app_user_role_relation', {
    name: 'app_user_role_relation_user_role_unique',
    fields: ['user_id', 'role_id'],
    type: 'unique',
  });
};

const down = async (queryInterface, Sequelize) => {
  await queryInterface.removeConstraint('app_user_role_relation', 'app_user_role_relation');
};

export default { 
  up, 
  down 
};
