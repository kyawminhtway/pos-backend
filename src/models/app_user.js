export const User = (sequelize, DataTypes) => {
  return sequelize.define('app_user', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: false,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    role_ids: { type: DataTypes.VIRTUAL },
  },
  {
    freezeTableName: true,
    modelName: 'app_user',
    m2mFieldsMapping: {
      role_ids: 'roles'
    }
  });
};

export const UserRole = (sequelize, DataTypes) => {
  return sequelize.define('app_user_role', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    code: {
      allowNull: false,
      type: DataTypes.STRING
    },
  },
  {
    freezeTableName: true,
    modelName: 'app_user_role',
    timestamps: false
  });
};

export const UserRoleRelation = (sequelize, DataTypes) => {
  return sequelize.define('app_user_role_relation', {
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    role_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
  },
  {
    freezeTableName: true,
    modelName: 'app_user_role_relation',
    timestamps: false
  });
};

const getTokenColumns = (DataTypes) => {
  return {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    value: {
      allowNull: false,
      type: DataTypes.STRING
    },
    date_of_expiration: {
      allowNull: false,
      type: DataTypes.DATE
    },
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  };
};

export const AccessToken = (sequelize, DataTypes) => {
  return sequelize.define('access_token', getTokenColumns(DataTypes),
  {
    freezeTableName: true,
    modelName: 'access_token',
  });
};

export const RefreshToken = (sequelize, DataTypes) => {
  return sequelize.define('refresh_token', getTokenColumns(DataTypes),
  {
    freezeTableName: true,
    modelName: 'refresh_token',
  });
};