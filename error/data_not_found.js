import { ERROR_CODE } from '../constant/error_code';
import CommonError from './common_error';

export default class DataNotFound extends CommonError {
    constructor(message) {
        super(ERROR_CODE.DATA_NOT_FOUND, message);
    }
}