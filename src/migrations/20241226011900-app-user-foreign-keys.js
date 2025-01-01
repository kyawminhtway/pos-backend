const up = async (queryInterface, Sequelize) => {
  // Access Token
  queryInterface.addConstraint('access_token', {
    name: 'access_token_user_id_fkey',
    fields: ['user_id'],
    type: 'foreign key',
    references: {
      table: 'app_user',
      field: 'id'
    },
    onDelete: 'CASCADE',
  });

  // Refresh Token
  queryInterface.addConstraint('refresh_token', {
    name: 'refresh_token_user_id_fkey',
    fields: ['user_id'],
    type: 'foreign key',
    references: {
      table: 'app_user',
      field: 'id'
    },
    onDelete: 'CASCADE',
  });

  // App User & Role Relation
  queryInterface.addConstraint('app_user_role_relation', {
    name: 'app_user_role_relation_user_id_fkey',
    fields: ['user_id'],
    type: 'foreign key',
    references: {
      table: 'app_user',
      field: 'id'
    },
    onDelete: 'CASCADE',
  });
  queryInterface.addConstraint('app_user_role_relation', {
    name: 'app_user_role_relation_role_id_fkey',
    fields: ['role_id'],
    type: 'foreign key',
    references: {
      table: 'app_user_role',
      field: 'id'
    },
    onDelete: 'CASCADE',
  });
  queryInterface.addConstraint('app_user_role_relation', {
    name: 'app_user_role_relation_user_role_unique',
    fields: ['user_id', 'role_id'],
    type: 'unique',
  });
};

const down = async (queryInterface, Sequelize) => {
  queryInterface.removeConstraint('access_token', 'access_token_user_id_fkey');
  queryInterface.removeConstraint('refresh_token', 'refresh_token_user_id_fkey');
  queryInterface.removeConstraint('app_user_role_relation', 'app_user_role_relation_user_id_fkey');
  queryInterface.removeConstraint('app_user_role_relation', 'app_user_role_relation_role_id_fkey');
};

export default { 
  up, 
  down 
};
