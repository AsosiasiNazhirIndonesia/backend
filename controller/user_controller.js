import { logger } from "express-glass";
import ParamIllegal from "../error/param_illegal";
import userService from "../service/user_service";
import { assertNotBlank, assertNotNull } from "../util/assert_util";
import responseUtil from "../util/response_util";
import userValidator from "../validator/user_validator";

const userController = {}

userController.add = async (req, res, next) => {
    try {
        logger().info(`Add new user request, data = ${JSON.stringify(req.body)}`);
        const validationResult = userValidator.add.validate(req.body);
        if (validationResult.error) {
            throw new ParamIllegal(validationResult.error.message);
        }
        const value = validationResult.value;
        const result = await userService.add(value);
        responseUtil.success(res, result);
    } catch (e) {
        logger().error(`Add new user failed, error = ${e}`);
        responseUtil.fail(res, e);
    }
}

userController.update = async (req, res, next) => {
    try {
        logger().info(`Update user request, data = ${JSON.stringify(req.body)}`);
        const validationResult = userValidator.update.validate(req.body);
        if (validationResult.error) {
            throw new ParamIllegal(validationResult.error.message);
        }
        const value = validationResult.value;
        const result = await userService.update(value);
        responseUtil.success(res, result);
    } catch (e) {
        logger().error(`Update new user failed, error = ${e}`);
        responseUtil.fail(res, e);
    }
}

userController.getAll = async (req, res, next) => {
    try {
        logger().info(`Query all users`);
        assertNotNull(req.query, new ParamIllegal('query url is required'));
        assertNotBlank(req.query.order_by, new ParamIllegal('order_by is required'));
        assertNotBlank(req.query.offset, new ParamIllegal('offset is required'));
        assertNotBlank(req.query.limit, new ParamIllegal('limit is required'));
        const result = await userService.getAll(req.query.order_by, req.query.offset, req.query.limit);
        responseUtil.success(res, result);
    } catch (e) {
        logger().error(`Query all users failed, error = ${e}`);
        responseUtil.fail(res, e);
    }
}

userController.getById = async (req, res, next) => {
    try {
        logger().info(`Query user by userId request`);
        assertNotNull(req.params, new ParamIllegal('query parameter is required'));
        assertNotBlank(req.params.user_id, new ParamIllegal('user_id is required'));
        const result = await userService.getByUserId(req.params.user_id);
        responseUtil.success(res, result);
    } catch (e) {
        logger().error(`Query user by userId failed, error = ${e}`);
        responseUtil.fail(res, e);
    }
}

userController.getByPublicKey = async (req, res, next) => {
    try {
        logger().info(`Query user by publicKey request`);
        assertNotNull(req.params, new ParamIllegal('query parameter is required'));
        assertNotBlank(req.params.public_key, new ParamIllegal('public_key is required'));
        const result = await userService.getByPublicKey(req.params.public_key);
        responseUtil.success(res, result);
    } catch (e) {
        logger().error(`Query user by publicKey request failed, error = ${e}`);
        responseUtil.fail(res, e);
    }
}

userController.login = async (req, res, next) => {
    try {
        logger().info(`User login request`);
        const validationResult = userValidator.login.validate(req.body);
        if (validationResult.error) {
            throw new ParamIllegal(validationResult.error.message);
        }
        const value = validationResult.value;
        const result = await userService.login(value);
        responseUtil.success(res, result);
    } catch(e) {
        logger().error(`User login failed, error = ${e}`);
        responseUtil.fail(res, e);
    }
}

export default userController;