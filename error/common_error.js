export default class CommonError extends Error {
    constructor(errorCode, message) {
        super(message);
        this.httpStatus = errorCode.httpStatus;
        this.code = errorCode.code; 
    }
}