import { ERROR_CODE } from '../constant/error_code';
import CommonError from './common_error';

export default class InternalServerError extends CommonError {
    constructor(message) {
        super(ERROR_CODE.INTERNAL_SERVER_ERROR, message);
    }
}