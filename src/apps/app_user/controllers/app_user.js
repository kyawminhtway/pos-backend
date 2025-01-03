import Models from '../../db.js';
import { ValidationError } from '../../../utils/customErrors.js';

const IMPORTANT_USER_FIELDS = [
    'username',
    'password'
];
const User = Models.User;

export const getUserByID = (req, res, next) => {
    var user = req.record.toJSON();
    delete user.password;
    return res.status(200).json({
        status: 'success',
        result: user,
    });
};

export const getUsers = async (req, res, next) => {
    const where = [];
    if(req.query.active === true || req.query.active === 'true')
        where.push({ active: true });
    const users = await User.scope({ method: ['apply_rights', req.roles] })
                            .findAll({ where, attributes: { exclude: ['password'] } });
    return res.status(200).json({
        status: 'success',
        result: users,
    });
};

export const createUser = async (req, res, next) => {
    const createdUser = await User.create(req.body, { transaction: req.transaction });
    return res.status(201).json({
        status: 'success',
        result: createdUser.id,
    })
};

export const createUsers = async (req, res, next) => {
    const createdUsers = await User.bulkCreate(req.body, { transaction: req.transaction, individualHooks: true });
    return res.status(201).json({
        status: 'success',
        result: createdUsers.map(u => u.id),
    });
};

export const checkToForceLogout = async (req, res, user_ids, body, transaction) => {
    const fieldsToChange = new Set(Object.keys(body));
    const destroyCookie = IMPORTANT_USER_FIELDS.filter(field => fieldsToChange.has(field)); 
    if(user_ids.includes(req.user.id) && destroyCookie.length > 0){
        await req.access_token.update({ active: false }, { transaction, individualHooks: true });
        res.cookie('refreshToken', '', {
            httpOnly: true,
            maxAge: 3 * 30 * 24 * 60 * 60 * 1000,
            path: '/api/auth/refresh-token'
        });
    }
};

export const updateUser = async (req, res, next) => {
    await req.record.update(req.body, { transaction: req.transaction, individualHooks: true });
    await checkToForceLogout(req, res, [req.record.id], req.body, req.transaction);
    return res.status(200).json({
        status: 'success',
        message: 'Successfully updated the user.'
    });
};

export const updateUsers = async (req, res, next) => {
    const body = req.body;
    if(!(body.record_ids && Array.isArray(body.record_ids) && body.record_ids.length > 0))
        throw new ValidationError('Record IDs are missing in the body.');
    await User.scope({ method: ['apply_rights', req.roles] }).update(body, { 
        where: [{ id: body.record_ids }], 
        transaction: req.transaction,
        individualHooks: true,
        changedFields: body,
    });
    await checkToForceLogout(req, res, body.record_ids, req.body, req.transaction);
    return res.status(200).json({
        status: 'success',
        message: 'Successfully updated the users.'
    });
};

export const deleteUser = async (req, res, next) => {
    const user_id = req.record.id;
    await req.record.destroy({ transaction: req.transaction });
    console.log(`User with ID - ${user_id} has been deleted.`);
    return res.status(200).json({
        status: 'success',
        message: 'Successfully deleted the user.'
    });
};

export const deleteUsers = async (req, res, next) => {
    await User.scope({ method: ['apply_rights', req.roles] }).destroy({ 
        where: [{ id: req.body.record_ids }], 
        transaction: req.transaction 
    });
    console.log(`Users with ID - ${req.body.record_ids} have been deleted.`);
    return res.status(200).json({
        status: 'success',
        message: 'Successfully deleted the users.'
    });
};
