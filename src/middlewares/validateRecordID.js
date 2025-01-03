import { ValidationError } from "../utils/customErrors.js";

const validateRecordID = (Model) => {
    return async (req, res, next) => {
        const record_id = req.params.id;
        if(!record_id || parseInt(record_id) === NaN){
            throw new ValidationError('Invalid record ID!')
        }
        const record = await Model.scope({ method: ['apply_rights', req.roles] })
                                  .findOne({ 
                                    where: [{ id: parseInt(record_id) }], 
                                    transaction: req.transaction 
                                  });
        if(!record) throw new ValidationError('Record cannot be found with the given ID.');
        req.record = record;
        next();
    };
};

export default validateRecordID;
