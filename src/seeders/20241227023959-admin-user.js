import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

const up = async (queryInterface, Sequelize) => {
  const hashedPassword = await bcrypt.hash('admin', SALT_ROUNDS);
  await queryInterface.insert(null, 'app_user', {
    name: 'Administrator',
    username: 'admin',
    password: hashedPassword,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  const adminRoleID = await queryInterface.rawSelect('app_user_role', 
    { where: { code: 'SUPERADMIN' } }, 
    ['id']
  );
  const adminUserID = await queryInterface.rawSelect('app_user', 
    { where: { username: 'admin' } }, 
    ['id']
  );
  await queryInterface.insert(null, 'app_user_role_relation', {
    user_id: adminUserID,
    role_id: adminRoleID,
  });
};

const down = async (queryInterface, Sequelize) => {
  const adminRoleID = await queryInterface.rawSelect('app_user_role', 
    { where: { code: 'SUPERADMIN' } }, 
    ['id']
  );
  const adminUserID = await queryInterface.rawSelect('app_user_role_relation', 
    { where: { role_id: adminRoleID } }, 
    ['user_id']
  );
  await queryInterface.bulkDelete('app_user', {
    id: adminUserID
  });
};

export default {
  up,
  down
};


