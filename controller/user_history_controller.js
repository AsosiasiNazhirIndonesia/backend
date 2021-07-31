import { logger } from "express-glass";
import ParamIllegal from "../error/param_illegal";
import userHistoryService from "../service/user_history_service";
import { assertNotBlank, assertNotNull } from "../util/assert_util";
import responseUtil from "../util/response_util";
import userHistoryValidator from "../validator/user_history_validator";


const userHistoryController = {}

userHistoryController.add = async (req, res, next) => {
    try {
        logger().info(`Add new user_history request, data = ${JSON.stringify(req.body)}`);
        const validationResult = userHistoryValidator.add.validate(req.body);
        if (validationResult.error) {
            throw new ParamIllegal(validationResult.error.message);
        }
        const value = validationResult.value;
        const result = await userHistoryService.add(value);
        responseUtil.success(res, result);
    } catch (e) {
        logger().error(`Add new user_history failed, error = ${e}`);
        responseUtil.fail(res, e);
    }
}

userHistoryController.update = async (req, res, next) => {
    try {
        logger().info(`Update user_history request, data = ${JSON.stringify(req.body)}`);
        const validationResult = userHistoryValidator.update.validate(req.body);
        if (validationResult.error) {
            throw new ParamIllegal(validationResult.error.message);
        }
        const value = validationResult.value;
        const result = await userHistoryService.update(value);
        responseUtil.success(res, result);
    } catch (e) {
        logger().error(`Update user_history failed, error = ${e}`);
        responseUtil.fail(res, e);
    }
}

userHistoryController.delete = async (req, res, next) => {
    try {
        logger().info(`Delete user_history request, data = ${JSON.stringify(req.body)}`);
        const validationResult = userHistoryValidator.delete.validate(req.body);
        if (validationResult.error) {
            throw new ParamIllegal(validationResult.error.message);
        }
        const value = validationResult.value;
        const result = await userHistoryService.delete(value);
        responseUtil.success(res, result);
    } catch (e) {
        logger().error(`Delete user_history failed, error = ${e}`);
        responseUtil.fail(res, e);
    }
}

userHistoryController.getAll = async (req, res, next) => {
    try {
        logger().info(`Query all user_history`);
        assertNotNull(req.query, new ParamIllegal('query url is required'));
        assertNotBlank(req.query.order_by, new ParamIllegal('order_by is required'));
        assertNotBlank(req.query.offset, new ParamIllegal('offset is required'));
        assertNotBlank(req.query.limit, new ParamIllegal('limit is required'));
        const result = await userHistoryService.getAll(req.query.order_by, req.query.offset, req.query.limit);
        responseUtil.success(res, result);
    } catch (e) {
        logger().error(`Query all user_history failed, error = ${e}`);
        responseUtil.fail(res, e);
    }
}

userHistoryController.getByUserHistoryId = async (req, res, next) => {
    try {
        logger().info(`Query user_history by user_history_id request`);
        assertNotNull(req.params, new ParamIllegal('query parameter is required'));
        assertNotBlank(req.params.user_history_id, new ParamIllegal('user_history_id is required'));
        const result = await userHistoryService.getByUserHistoryId(req.params.user_history_id);
        responseUtil.success(res, result);
    } catch (e) {
        logger().error(`Query user_history by user_history_id failed, error = ${e}`);
        responseUtil.fail(res, e);
    }
}

export default userHistoryController;