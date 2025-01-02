const up = async (queryInterface, Sequelize) => {
    // Product Category
    await queryInterface.createTable('product_category', {
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
        description: {
            type: Sequelize.TEXT,
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
    // Product
    await queryInterface.createTable('product', {
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
        category_id: {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
                model: 'product_category',
                key: 'id',
            },
            onDelete: 'RESTRICT'
        },
        reference: {
            type: Sequelize.STRING,
        },
        barcode: {
            type: Sequelize.STRING,
        },
        price: {
            type: Sequelize.DOUBLE,
        },
        cost: {
            type: Sequelize.DOUBLE,
        },
        description: {
            type: Sequelize.TEXT,
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
};
  
const down = async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('product_category');
    await queryInterface.dropTable('product');
};
  
export default { 
    up, 
    down 
};