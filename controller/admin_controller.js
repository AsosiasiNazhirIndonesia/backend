import { logger } from "express-glass";
import ParamIllegal from "../error/param_illegal";
import adminService from "../service/admin_service";
import { assertNotBlank, assertNotNull } from "../util/assert_util";
import responseUtil from "../util/response_util";
import adminValidator from "../validator/admin_validator";

const adminController = {}

adminController.add = async (req, res, next) => {
    try {
        logger().info(`Add new admin request, data = ${JSON.stringify(req.body)}`);
        const validationResult = adminValidator.add.validate(req.body);
        if (validationResult.error) {
            throw new ParamIllegal(validationResult.error.message);
        }
        const value = validationResult.value;
        const result = await adminService.add(value);
        responseUtil.success(res, result);
    } catch (e) {
        logger().error(`Add new admin failed, error = ${e}`);
        responseUtil.fail(res, e);
    }
}

adminController.update = async (req, res, next) => {
    try {
        logger(`Update admin request, data = ${JSON.stringify(req.body)}`);
        const validationResult = adminValidator.update.validate(req.body);
        if (validationResult.error) {
            throw new ParamIllegal(validationResult.error.message);
        }
        const value = validationResult.value;
        const result = await adminService.update(value);
        responseUtil.success(res, result);
    } catch (e) {
        logger().error(`Update admin failed, error = ${e}`);
        responseUtil.fail(res, e);
    }
}

adminController.getByPublicKey = async (req, res, next) => {
    try {
        logger().info(`Query admin by publicKey request`);
        assertNotNull(req.params, new ParamIllegal('query parameter is required'));
        assertNotBlank(req.params.public_key, new ParamIllegal('public_key is required'));
        const result = await adminService.getByPublicKey(req.params.public_key);
        responseUtil.success(res, result);
    } catch (e) {
        logger().error(`Query admin by publicKey request failed, error = ${e}`);
        responseUtil.fail(res, e);
    }
}

adminController.login = async (req, res, next) => {
    try {
        logger().info(`Admin login request`);
        const validationResult = adminValidator.login.validate(req.body);
        if (validationResult.error) {
            throw new ParamIllegal(validationResult.error.message);
        }
        const value = validationResult.value;
        const result = await adminService.login(value);
        responseUtil.success(res, result);
    } catch(e) {
        logger().error(`Admin login failed, error = ${e}`);
        responseUtil.fail(res, e);
    }
}

export default adminController;