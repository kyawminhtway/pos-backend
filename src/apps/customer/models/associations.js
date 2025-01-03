const CustomerAssociations = (Models) => {

    const {
        RegionState,
        City,
        Township,
        Customer,
        CustomerTag,
        CustomerTagRelation
    } = Models;
    
    // City
    RegionState.hasMany(City, { foreignKey: 'region_state_id' });
    City.belongsTo(RegionState, { foreignKey: 'region_state_id' });

    // Township
    City.hasMany(Township, { foreignKey: 'city_id' });
    Township.belongsTo(City, { foreignKey: 'city_id' });

    // Customer
    Township.hasMany(Customer, { foreignKey: 'township_id' });
    Customer.belongsTo(Township, { foreignKey: 'township_id' });

    City.hasMany(Customer, { foreignKey: 'city_id' });
    Customer.belongsTo(City, { foreignKey: 'city_id' });

    RegionState.hasMany(Customer, { foreignKey: 'region_state_id' });
    Customer.belongsTo(RegionState, { foreignKey: 'region_state_id' });

    // Customer Tag Relation
    Customer.belongsToMany(CustomerTag, { 
        through: CustomerTagRelation, 
        foreignKey: 'customer_id',
        unique: false,
        as: 'tags' 
    });
    CustomerTag.belongsToMany(Customer, { 
        through: CustomerTagRelation,
        foreignKey: 'tag_id',
        unique: false,
        as: 'customers'
    });
};
    
export default CustomerAssociations;