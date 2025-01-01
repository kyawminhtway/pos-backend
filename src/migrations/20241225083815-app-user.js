const up = async (queryInterface, Sequelize) => {
  // User
  await queryInterface.createTable('app_user', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    active: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
    name: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    username: {
      allowNull: false,
      type: Sequelize.STRING,
      unique: false,
    },
    password: {
      allowNull: false,
      type: Sequelize.STRING
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  });

  // User Role
  await queryInterface.createTable('app_user_role', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      allowNull: false,
      type: Sequelize.STRING
    },
    code: {
      allowNull: false,
      type: Sequelize.STRING
    },
  });

  // User & Role Relation
  await queryInterface.createTable('app_user_role_relation', {
    user_id: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    role_id: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
  });

  // Access Token & Refresh Tokens
  const columns = {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    value: {
      allowNull: false,
      type: Sequelize.STRING
    },
    date_of_expiration: {
      allowNull: false,
      type: Sequelize.DATE
    },
    user_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    active: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      alloNull: false,
      type: Sequelize.DATE
    }
  };
  await queryInterface.createTable('access_token', columns);
  await queryInterface.createTable('refresh_token', columns);
};

const down = async (queryInterface, Sequelize) => {
  await queryInterface.dropTable('app_user');
  await queryInterface.dropTable('app_user_role');
  await queryInterface.dropTable('app_user_role_relation');
  await queryInterface.dropTable('access_token');
  await queryInterface.dropTable('refresh_token');
};

export default { 
  up, 
  down 
};