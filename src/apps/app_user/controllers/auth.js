import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import bcrypt from 'bcrypt';
import Models from '../../db.js';
import { AuthError, ValidationError } from '../../../utils/customErrors.js';

const User = Models.User;
const AccessToken = Models.AccessToken;
const RefreshToken = Models.RefreshToken;
const DEFAULT_ACCESS_TOKEN_LIFE_AMOUNT = 3;
const DEFAULT_ACCESS_TOKEN_LIFE_UNIT = 'hours';
const DEFAULT_REFRESH_TOKEN_LIFE_AMOUNT = 3;
const DEFAULT_REFRESH_TOKEN_LIFE_UNIT = 'months';

const getTokenLifetimeConfiguration = (data) => {
    return {
        access_token_lifetime_amount : data.access_token_lifetime_amount || DEFAULT_ACCESS_TOKEN_LIFE_AMOUNT,
        access_token_lifetime_unit : data.access_token_lifetime_unit || DEFAULT_ACCESS_TOKEN_LIFE_UNIT,
        refresh_token_lifetime_amount : data.refresh_token_lifetime_amount || DEFAULT_REFRESH_TOKEN_LIFE_AMOUNT,
        refresh_token_lifetime_unit : data.refresh_token_lifetime_unit || DEFAULT_REFRESH_TOKEN_LIFE_UNIT,
    }
};

const generateToken = async (Token, user_id, lifetime_amount, lifetime_unit, transaction) => {
    const token = await Token.create({
        value: uuidv4(),
        date_of_expiration: moment().add(lifetime_amount, lifetime_unit).format('YYYY-MM-DD HH:mm:ss'),
        user_id: user_id,
    }, { transaction });
    return token;
};

const createTokens = async (data, user_id, transaction) => {
    const {
        access_token_lifetime_amount,
        access_token_lifetime_unit,
        refresh_token_lifetime_amount,
        refresh_token_lifetime_unit
    } = getTokenLifetimeConfiguration(data);
    const access_token = await generateToken(AccessToken, 
                                             user_id, 
                                             access_token_lifetime_amount, 
                                             access_token_lifetime_unit,
                                             transaction);
    const refresh_token = await generateToken(RefreshToken, 
                                              user_id, 
                                              refresh_token_lifetime_amount, 
                                              refresh_token_lifetime_unit,
                                              transaction);
    return {
        access_token,
        refresh_token,
    }
};

export const authtenticate = async (req, res, next, transaction) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = await User.findOne({ 
        attributes: ['id', 'password'], 
        where: [
            { active: true },
            { username: username },
        ]
    });
    if(!user) 
        throw new AuthError('Invalid username!');
    const isValid = await bcrypt.compare(password, user.password);
    if(!isValid) 
        throw new AuthError('Username and password do not match!');
    const { access_token, refresh_token } = await createTokens(req.body, user.id, transaction);
    res.cookie('refreshToken', refresh_token.value, {
        httpOnly: true,
        maxAge: 3 * 30 * 24 * 60 * 60 * 1000,
        path: '/api/auth/refresh-token'
    });
    return res.status(200).json({ 
        status: 'success', 
        message: 'User authenticated!',
        access_token: access_token.value,
        refresh_token: refresh_token.value,
    });
};

export const refreshToken = async (req, res, next, transaction) => {
    const refresh_token_value = req.cookies.refreshToken;
    if(!refresh_token_value) 
        throw new ValidationError('Refresh token is missing.');
    const refresh_token = await RefreshToken.findOne({ 
        attributes: ['id', 'date_of_expiration', 'user_id'],
        where: [
            { active: true },
            { value: refresh_token_value },
            { "$app_user.active$": true }
        ],
        include: [{
            model: User,
            foreignKey: 'user_id',
            attributes: ['id'],
        }]
    });
    if(!refresh_token)
        throw new AuthError('Invalid refresh token!');
    const date_of_expiration = moment(refresh_token.date_of_expiration);
    const current_time = moment();
    if(current_time >= date_of_expiration)
        throw new AuthError('Refresh token has already expired.');
    refresh_token.update({ active: false }, { transaction });
    const result = await createTokens(req.query, refresh_token.user_id, transaction);
    res.cookie('refreshToken', result.refresh_token.value, {
        httpOnly: true,
        maxAge: 3 * 30 * 24 * 60 * 60 * 1000,
        path: '/api/auth/refresh-token'
    });
    return res.status(200).json({
        access_token: result.access_token.value,
        refresh_token: result.refresh_token.value,
    });
};