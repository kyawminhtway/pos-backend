import { ValidationError } from "../errors/customErrors.js";

const validateBatchRecordIDs = (req, res, next) => {
    const body = req.body;
    if(!(body.record_ids && Array.isArray(body.record_ids) && body.record_ids.length > 0))
        throw new ValidationError('Record IDs are missing in the body.');
    next();
};

export default validateBatchRecordIDs;