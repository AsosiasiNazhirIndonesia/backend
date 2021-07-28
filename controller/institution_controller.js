import { logger } from "express-glass"
import ParamIllegal from "../error/param_illegal";
import institutionService from "../service/institution_service";
import { assertNotBlank, assertNotNull } from "../util/assert_util";
import responseUtil from "../util/response_util";
import institutionValidator from "../validator/institution_validator";


const institutionController = {}

institutionController.add = async (req, res, next) => {
    try {
        logger().info(`Add new institution request, data = ${JSON.stringify(req.body)}`);
        const validationResult = institutionValidator.add.validate(req.body);
        if (validationResult.error) {
            throw new ParamIllegal(validationResult.error.message);
        }
        const value = validationResult.value;
        const result = await institutionService.add(value);
        responseUtil.success(res, result);
    } catch (e) {
        logger().info(`Add new institution failed, error = ${e}`);
        responseUtil.fail(res, e);
    }
}

institutionController.update = async (req, res, next) => {
    try {
        logger().info(`Update institution request, data = ${JSON.stringify(req.body)}`);
        const validationResult = institutionValidator.update.validate(req.body);
        if (validationResult.error) {
            throw new ParamIllegal(validationResult.error.message);
        }
        const value = validationResult.value;
        const result = await institutionService.update(value);
        responseUtil.success(res, result);
    } catch (e) {
        logger().info(`Update institution failed, error = ${e}`);
        responseUtil.fail(res, e)
    }
}

institutionController.delete = async (req, res, next) => {
    try {
        logger().info(`Delete institution request, data = ${JSON.stringify(req.body)}`);
        const validationResult = institutionValidator.delete.validate(req.body);
        if (validationResult.error) {
            throw new ParamIllegal(validationResult.error.message);
        }
        const value = validationResult.value;
        const result = await institutionService.delete(value);
        responseUtil.success(res, result);
    } catch (e) {
        logger().info(`Delete institution failed, error = ${e}`);
        responseUtil.fail(res, e)
    }
}

institutionController.getAll = async (req, res, next) => {
    try {
        logger().info(`Query all institutions`);
        assertNotNull(req.query, new ParamIllegal('query url is required'));
        assertNotBlank(req.query.order_by, new ParamIllegal('order_by is required'));
        assertNotBlank(req.query.offset, new ParamIllegal('offset is required'));
        assertNotBlank(req.query.limit, new ParamIllegal('limit is required'));
        const result = await institutionService.getAll(req.query.order_by, req.query.offset, req.query.limit);
        responseUtil.success(res, result);
    } catch (e) {
        logger().error(`Query all institutions failed, error = ${e}`);
        responseUtil.fail(res, e);
    }
}

institutionController.getByInstitutionId = async (req, res, next) => {
    try {
        logger().info(`Query institution by institutionId request`);
        assertNotNull(req.params, new ParamIllegal('query parameter is required'));
        assertNotBlank(req.params.institution_id, new ParamIllegal('institution_id is required'));
        const result = await institutionService.getByInstitutionId(req.params.institution_id);
        responseUtil.success(res, result);
    } catch (e) {
        logger().error(`Query institution by institutionId failed, error = ${e}`);
        responseUtil.fail(res, e);
    }
}

export default institutionController;