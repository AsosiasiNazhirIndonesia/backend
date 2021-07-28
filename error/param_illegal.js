import { ERROR_CODE } from '../constant/error_code';
import CommonError from './common_error';

export default class ParamIllegal extends CommonError {
    constructor(message) {
        super(ERROR_CODE.PARAM_ILLEGAL, message);
    }
}