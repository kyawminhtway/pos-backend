const AppUserAssociations = (Models) => {

    const {
        User,
        UserRole,
        UserRoleRelation,
        AccessToken,
        RefreshToken,
    } = Models;
    
    // User & Role Relation
    User.belongsToMany(UserRole, { 
        through: UserRoleRelation, 
        foreignKey: 'user_id',
        unique: false,
        as: 'roles' 
    });
    UserRole.belongsToMany(User, { 
        through: UserRoleRelation,
        foreignKey: 'role_id',
        unique: false,
        as: 'users'
    });
    
    // Access Token
    User.hasMany(AccessToken, { foreignKey: 'user_id' });
    AccessToken.belongsTo(User, { foreignKey: 'user_id' });
    
    // Refresh Token
    User.hasMany(RefreshToken, { foreignKey: 'user_id' });
    RefreshToken.belongsTo(User, { foreignKey: 'user_id' });
    
};
    
export default AppUserAssociations;