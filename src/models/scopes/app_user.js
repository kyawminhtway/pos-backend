import { Op } from "sequelize";

const AppUserScopes = (Models) => {
    const {
        User
    } = Models;

    User.addScope('apply_rights', (roles) => {
        if(roles.includes('SUPERADMIN')) return {};
        return { where: [{ id: { [Op.ne]: 1 } }] };
    });
};

export default AppUserScopes;
  
  
  