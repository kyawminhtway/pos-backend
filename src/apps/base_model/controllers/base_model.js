import { ValidationError } from '../../../utils/customErrors.js';

export const getRecordByID = (req, res, next) => {
    return res.status(200).json({
        status: 'success',
        result: req.record,
    });
};

export const getRecords = Model => async (req, res, next) => {
    const records = await Model.scope({ method: ['apply_rights', req.roles] })
                               .findAll({ transaction: req.transaction });
    return res.status(200).json({
        status: 'success',
        result: records,
    });
};

export const createRecord = Model => async (req, res, next) => {
    const record = await Model.create(req.body, { transaction: req.transaction });
    return res.status(201).json({
        status: 'success',
        result: record.id,
    });
};

export const createRecords = Model = async (req, res, next) => {
    const records = await Model.bulkCreate(req.body, { 
        transaction: req.transaction,
        individualHooks: true
    });
    return res.status(201).json({
        status: 'success',
        result: records.map(record => record.id),
    });
};

export const updateRecord = async (req, res, next) => {
    await req.record.update(req.body, { 
        transaction: req.transaction, 
        individualHooks: true 
    });
    return res.status(200).json({
        status: 'success',
        message: 'Successfully updated the record.'
    });
};

export const updateRecords = Model => async (req, res, next) => {
    const body = req.body;
    if(!(body.record_ids && Array.isArray(body.record_ids) && body.record_ids.length > 0))
        throw new ValidationError('Record IDs are missing in the body.');
    await Model.scope({ method: ['apply_rights', req.roles] }).update(body, { 
        where: [{ id: body.record_ids }], 
        transaction: req.transaction,
        individualHooks: true,
    });
    return res.status(200).json({
        status: 'success',
        message: 'Successfully updated the records.'
    });
};

export const deleteRecord = async (req, res, next) => {
    const record_id = req.record.id;
    await req.record.destroy({ transaction: req.transaction });
    console.log(`${req.record.constructor.name} with ID - ${record_id} has been deleted.`);
    return res.status(200).json({
        status: 'success',
        message: 'Successfully deleted the record.'
    });
};

export const deleteRecords = Model => async (req, res, next) => {
    await Model.scope({ method: ['apply_rights', req.roles] }).destroy({ 
        where: [{ id: req.body.record_ids }], 
        transaction: req.transaction 
    });
    console.log(`${Model.name} with ID - ${req.body.record_ids} have been deleted.`);
    return res.status(200).json({
        status: 'success',
        message: 'Successfully deleted the records.'
    });
};