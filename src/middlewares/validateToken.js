import moment from 'moment';
import Models from '../apps/db.js';
import { AuthError, ValidationError } from '../utils/customErrors.js';

const User = Models.User;
const UserRole = Models.UserRole;
const AccessToken = Models.AccessToken;

const validateToken = async (req, res, next) => {
    var access_token_value = req.headers['authorization'];
    if(!access_token_value || !access_token_value.startsWith('Bearer '))
        throw new ValidationError('Invalid authorization header !');
    access_token_value = access_token_value.slice(7);
    const access_token = await AccessToken.findOne({ 
        attributes: ['id', 'user_id', 'date_of_expiration'],
        where: [
            { active: true },
            { value: access_token_value },
            { '$app_user.active$': true }
        ],
        include: [{
            model: User,
            foreignKey: 'user_id',
            attributes: ['id', 'name', 'username']
        }]
    });
    if(!access_token)
        throw new AuthError('Invalid access token!')
    const date_of_expiration = moment(access_token.date_of_expiration);
    const current_time = moment();
    if(current_time >= date_of_expiration)
        throw new AuthError('Access token has already expired.');
    req.user = access_token.app_user;
    req.access_token = access_token;
    const roles = await UserRole.findAll({
        attributes: ['code'],
        include: [{ association: 'users', attributes: [] }],
        where: [{ '$users.id$': req.user.id }]
    });
    if(roles.length <= 0) 
        throw new ValidationError('Logged in user doesn\'t have any role.');
    req.roles = roles.map(role => role.code);
    next();
};

export default validateToken;