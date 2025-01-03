import { Transaction } from 'sequelize';
import Models from '../apps/db.js';

const sequelize = Models.sequelize;

const transactionHandler = (f, options={}) => {
    const callback = async (req, res, next) => {
        const response = await sequelize.transaction({
            isolationLevel: options.isolationLevel ? options.isolationLevel : Transaction.ISOLATION_LEVELS.REPEATABLE_READ,
            ...options
        }, async transaction => {
            req.transaction = transaction;
            const result = await f(req, res, next);
            return result;
        });
        return response;
    };
    return callback;
};

export default transactionHandler;
