import bcrypt from 'bcrypt';
import { ValidationError } from '../../../utils/customErrors.js';

const SALT_ROUNDS = 10;

const AppUserHooks = (Models) => {
    const {
        User
    } = Models;

    const checkUsername = async (username, transaction) => {
        const user = await User.findOne({ 
            attributes: ['id'],
            where: { username },
            transaction
        });
        if(user)
            throw new ValidationError(`Username '${username}' already exists.`);
    };

    User.beforeCreate(async (user, options) => {
        await checkUsername(user.username, options.transaction);
        user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
    });
    User.beforeUpdate(async (user, options) => {
        if(user.changed('username'))
            await checkUsername(user.username, options.transaction);
        if(user.changed('password'))
            user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
    });
    User.afterCreate(async (user, options) => {
        await user.setM2MFields(user, options);
    });
    User.afterUpdate(async (user, options) => {
        await user.setM2MFields(user, options);
    });
};

export default AppUserHooks;