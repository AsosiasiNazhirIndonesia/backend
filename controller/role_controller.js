import { logger } from "express-glass";
import ParamIllegal from "../error/param_illegal";
import roleService from "../service/role_service";
import { assertNotBlank, assertNotNull } from "../util/assert_util";
import responseUtil from "../util/response_util";
import roleValidator from "../validator/role_validator";


const roleController = {}

roleController.add = async (req, res, next) => {
    try {
        logger().info(`Add new role request, data ${JSON.stringify(req.body)}`);
        const validationResult = roleValidator.add.validate(req.body);
        if (validationResult.error) {
            throw new ParamIllegal(validationResult.error.message);
        }
        const value = validationResult.value;
        const result = await roleService.add(value);
        responseUtil.success(res, result);
    } catch (e) {
        logger().info(`Add new role failed, error ${e}`);
        responseUtil.fail(res, e);
    }
}

roleController.update = async (req, res, next) => {
    try {
        logger().info(`Update role request, data = ${JSON.stringify(req.body)}`);
        const validationResult = roleValidator.update.validate(req.body);
        if (validationResult.error) {
            throw new ParamIllegal(validationResult.error.message);
        }
        const value = validationResult.value;
        const result = await roleService.update(value);
        responseUtil.success(res, result);
    } catch (e) {
        logger().info(`Update role failed, error = ${e}`);
        responseUtil.fail(res, e);
    }
}

roleController.delete = async (req, res, next) => {
    try {
        logger().info(`Delete role request, data = ${JSON.stringify(req.body)}`);
        const validationResult = roleValidator.delete.validate(req.body);
        if (validationResult.error) {
            throw new ParamIllegal(validationResult.error.message);
        }
        const value = validationResult.value;
        const result = await roleService.delete(value);
        responseUtil.success(res, result);
    } catch (e) {
        logger().info(`Delete role failed, error = ${e}`);
        responseUtil.fail(res, e);
    }
}

roleController.getAll = async (req, res, next) => {
    try {
        logger().info(`Query all roles`);
        assertNotNull(req.query, new ParamIllegal('query url is required'));
        assertNotBlank(req.query.order_by, new ParamIllegal('order_by is required'));
        assertNotBlank(req.query.offset, new ParamIllegal('offset is required'));
        assertNotBlank(req.query.limit, new ParamIllegal('limit is required'));
        const result = await roleService.getAll(req.query.order_by, req.query.offset, req.query.limit);
        responseUtil.success(res, result);
    } catch (e) {
       logger().error(`Query all roles failed, error = ${e}`);
       responseUtil.fail(res, e); 
    }
}

roleController.getByRoleId = async (req, res, next) => {
    try {
        logger().info(`Query role by roleId request`);
        assertNotNull(req.params, new ParamIllegal(`query parameter is required`));
        assertNotBlank(req.params.role_id, new ParamIllegal('role_id is required'));
        const result = await roleService.getByRoleId(req.params.role_id);
        responseUtil.success(res, result);
    } catch (e) {
        logger().error(`Query role by roleId failed, error = ${e}`);
        responseUtil.fail(res, e);
    }
}

export default roleController;