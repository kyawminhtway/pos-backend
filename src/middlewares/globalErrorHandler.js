import { UniqueConstraintError, DatabaseError } from 'sequelize';
import { AuthError, AccessError, ValidationError } from "../errors/customErrors.js";

const globalErrorHandler = (err, req, res, next) => {
    if(err instanceof ValidationError){
        var error = err.serializeError();
        console.log('error', error.message);
        return res.status(400).json(error);
    }
    if(err instanceof AccessError){
        var error = err.serializeError();
        console.log('error', error.message);
        return res.status(401).json(error);
    }
    if(err instanceof AuthError){
        var error = err.serializeError();
        console.log('error', error.message);
        return res.status(403).json(error);
    }
    if(err instanceof UniqueConstraintError){
        console.log(err.original.detail);
        const message = err.errors[0].message;
        const value = err.errors[0].value;
        return res.status(400).json({
            status: 'fail', 
            message: `${message.charAt(0).toUpperCase()}${message.slice(1)} - (${value}).`
        });
    }
    if(err instanceof DatabaseError){
        console.log(err.parent);
        return res.status(400).json({status: 'fail', message: err.parent, parameters: err.parent.parent});
    }
    console.log('error', err);
    console.log('error', err.stack);
    return res.status(500).json({message: 'Internal Server Error', details: err.stack});
};

export default globalErrorHandler;