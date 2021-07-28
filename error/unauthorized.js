import { ERROR_CODE } from "../constant/error_code";
import CommonError from "./common_error";

export default class Unauthorized extends CommonError {
    constructor(message) {
        super(ERROR_CODE.UNAUTHORIZED, message);
    }
}