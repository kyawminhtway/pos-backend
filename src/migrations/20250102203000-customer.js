const up = async (queryInterface, Sequelize) => {
    // Region/State
    await queryInterface.createTable('region_state', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        name: {
            allowNull: false,
            type: Sequelize.STRING,
        },
        remarks: {
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
    // City
    await queryInterface.createTable('city', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        name: {
            allowNull: false,
            type: Sequelize.STRING,
        },
        region_state_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'region_state',
                key: 'id'
            },
            onDelete: 'RESTRICT'
        },
        remarks: {
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
    // Township
    await queryInterface.createTable('township', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        name: {
            allowNull: false,
            type: Sequelize.STRING,
        },
        city_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'city',
                key: 'id'
            },
            onDelete: 'RESTRICT'
        },
        remarks: {
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
    // Customer
    await queryInterface.createTable('customer', {
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
        reference: {
            type: Sequelize.STRING,
            unique: true
        },
        street: {
            type: Sequelize.STRING,
        },
        township_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'township',
                key: 'id'
            },
            onDelete: 'RESTRICT'
        },
        city_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'city',
                key: 'id'
            },
            onDelete: 'RESTRICT'
        },
        region_state_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'region_state',
                key: 'id'
            },
            onDelete: 'RESTRICT'
        },
        phone: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true
            }
        },
        note: {
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
    // Tag
    await queryInterface.createTable('customer_tag', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
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
    // Customer & Tag Relation
    await queryInterface.createTable('customer_tag_relation', {
        customer_id: {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
                model: 'customer',
                key: 'id'
            },
        onDelete: 'CASCADE'
        },
        tag_id: {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
                model: 'customer_tag',
                key: 'id'
            },
            onDelete: 'CASCADE'
        },
    });
};
  
const down = async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('customer');
    await queryInterface.dropTable('region_state');
    await queryInterface.dropTable('city');
    await queryInterface.dropTable('township');
    await queryInterface.dropTable('customer_tag');
    await queryInterface.dropTable('customer_tag_relation');
};
  
export default { 
    up, 
    down 
};