import Models from '../models/db.js';
import { ValidationError } from '../errors/customErrors.js';

const IMPORTANT_USER_FIELDS = [
    'username',
    'password'
];
const User = Models.User;

export const getUserByID = async (req, res, next) => {
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

export const createUser = async (req, res, next, transaction) => {
    const createdUser = await User.create(req.body, { transaction });
    return res.status(201).json({
        status: 'success',
        result: createdUser.id,
    })
};

export const createUsers = async (req, res, next, transaction) => {
    const createdUsers = await User.bulkCreate(req.body, { transaction, individualHooks: true });
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

export const updateUser = async (req, res, next, transaction) => {
    await req.record.update(req.body, { transaction, individualHooks: true });
    await checkToForceLogout(req, res, [req.record.id], req.body, transaction);
    return res.status(200).json({
        status: 'success',
        message: 'Successfully updated the user(s).'
    });
};

export const updateUsers = async (req, res, next, transaction) => {
    const body = req.body;
    if(!(body.record_ids && Array.isArray(body.record_ids) && body.record_ids.length > 0))
        throw new ValidationError('Record IDs are missing in the body.');
    await User.update(body, { 
        where: { id: body.record_ids }, 
        transaction,
        individualHooks: true,
        changedFields: body,
    });
    await checkToForceLogout(req, res, body.record_ids, req.body, transaction);
    return res.status(200).json({
        status: 'success',
        message: 'Successfully updated the user(s).'
    });
};

export const deleteUser = async (req, res, next, transaction) => {
    const user_id = req.record.id;
    await req.record.destroy({ transaction });
    console.log(`User with ID - ${user_id} has been deleted.`);
    return res.status(200).json({
        status: 'success',
        message: 'Successfully deleted the user.'
    });
};

export const deleteUsers = async (req, res, next, transaction) => {
    await User.destroy({ 
        where: [{ id: req.body.record_ids }], 
        transaction 
    });
    console.log(`Users with ID - ${req.body.record_ids} have been deleted.`);
    return res.status(200).json({
        status: 'success',
        message: 'Successfully deleted the user.'
    });
};
