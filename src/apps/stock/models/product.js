export const ProductCategory = (sequelize, DataTypes) => {
  return sequelize.define('product_category', {
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
          type: DataTypes.STRING,
      },
      description: {
          type: DataTypes.TEXT,
      },
      createdAt: {
          allowNull: false,
          type: DataTypes.DATE
      },
      updatedAt: {
          allowNull: false,
          type: DataTypes.DATE
      }
  },
  {
      freezeTableName: true,
      modelName: 'product_category',
  });
};

export const Product = (sequelize, DataTypes) => {
  return sequelize.define('product', {
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
          type: DataTypes.STRING,
      },
      category_id: {
          allowNull: false,
          type: DataTypes.INTEGER,
      },
      reference: {
          type: DataTypes.STRING,
      },
      barcode: {
          type: DataTypes.STRING,
      },
      price: {
          type: DataTypes.DOUBLE,
      },
      cost: {
          type: DataTypes.DOUBLE,
      },
      description: {
          type: DataTypes.TEXT,
      },
      createdAt: {
          allowNull: false,
          type: DataTypes.DATE
      },
      updatedAt: {
          allowNull: false,
          type: DataTypes.DATE
      }
  },
  {
      freezeTableName: true,
      modelName: 'product',
  });
};