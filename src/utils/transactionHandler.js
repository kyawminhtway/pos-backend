import { Transaction } from 'sequelize';
import Models from '../models/db.js';

const sequelize = Models.sequelize;

const transactionHandler = (f, isolationLevel) => {
    const callback = async (req, res, next) => {
        const response = await sequelize.transaction({
            isolationLevel: isolationLevel ? isolationLevel : Transaction.ISOLATION_LEVELS.REPEATABLE_READ
        }, async transaction => {
            const result = await f(req, res, next, transaction);
            return result;
        });
        return response;
    };
    return callback;
};

export default transactionHandler;
