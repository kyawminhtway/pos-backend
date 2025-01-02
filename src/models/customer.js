export const RegionState = (sequelize, DataTypes) => {
    return sequelize.define('region_state', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        remarks: {
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
        modelName: 'region_state',
    });
};

export const City = (sequelize, DataTypes) => {
    return sequelize.define('city', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        region_state_id: {
            type: DataTypes.INTEGER,
        },
        remarks: {
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
        modelName: 'city',
    });
};

export const Township = (sequelize, DataTypes) => {
    return sequelize.define('township', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        city_id: {
            type: DataTypes.INTEGER,
        },
        remarks: {
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
        modelName: 'township',
    });
};

export const Customer = (sequelize, DataTypes) => {
    return sequelize.define('customer', {
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
        reference: {
            type: DataTypes.STRING,
            unique: true
        },
        street: {
            type: DataTypes.STRING,
        },
        township_id: {
            type: DataTypes.INTEGER,
        },
        city_id: {
            type: DataTypes.INTEGER,
        },
        region_state_id: {
            type: DataTypes.INTEGER,
        },
        phone: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true
            }
        },
        note: {
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
        modelName: 'customer',
        m2mFieldsMapping: {
            tag_ids: 'tags'
        }
    });
};

export const CustomerTag = (sequelize, DataTypes) => {
    return sequelize.define('customer_tag', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
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
        modelName: 'customer_tag',
    });
};

export const CustomerTagRelation = (sequelize, DataTypes) => {
    return sequelize.define('customer_tag_relation', {
        customer_id: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        tag_id: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
    },
    {
        freezeTableName: true,
        modelName: 'customer_tag_relation',
        timestamps: false
    });
};