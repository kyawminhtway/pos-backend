export class AuthError extends Error{
    constructor(message){
        super(message);
    }
    serializeError(){
        return {status: 'fail', message: this.message};
    }
};

export class AccessError extends Error{
    constructor(message){
        super(message);
    }
    serializeError(){
        return {status: 'fail', message: this.message};
    }
};

export class ValidationError extends Error{
    constructor(message){
        super(message);
    }
    serializeError(){
        return {status: 'fail', message: this.message};
    }
};