import { logger } from "express-glass"
import ParamIllegal from "../error/param_illegal";
import certificateTypeService from "../service/certificate_type_service";
import { assertNotBlank, assertNotNull } from "../util/assert_util";
import responseUtil from "../util/response_util";
import certificateTypeValidator from "../validator/certificate_type_validator";


const certificateTypeController = {}

certificateTypeController.add = async (req, res, next) => {
    try {
        logger().info(`Add new certificate_type request, data = ${JSON.stringify(req.body)}`);
        const validationResult = certificateTypeValidator.add.validate(req.body);
        if (validationResult.error) {
            throw new ParamIllegal(validationResult.error.message);
        }
        const value = validationResult.value;
        const result = await certificateTypeService.add(value);
        responseUtil.success(res, result);
    } catch (e) {
        logger().info(`Add new certificate_type failed, error = ${e}`);
        responseUtil.fail(res, e);
    }
}

certificateTypeController.update = async (req, res, next) => {
    try {
        logger().info(`Update certificate_type request, data = ${JSON.stringify(req.body)}`);
        const validationResult = certificateTypeValidator.update.validate(req.body);
        if (validationResult.error) {
            throw new ParamIllegal(validationResult.error.message);
        }
        const value = validationResult.value;
        const result = await certificateTypeService.update(value);
        responseUtil.success(res, result);
    } catch (e) {
        logger().info(`Update certificate_type failed, error = ${e}`);
        responseUtil.fail(res, e)
    }
}

certificateTypeController.delete = async (req, res, next) => {
    try {
        logger().info(`Delete certificate_type request, data = ${JSON.stringify(req.body)}`);
        const validationResult = certificateTypeValidator.delete.validate(req.body);
        if (validationResult.error) {
            throw new ParamIllegal(validationResult.error.message);
        }
        const value = validationResult.value;
        const result = await certificateTypeService.delete(value);
        responseUtil.success(res, result);
    } catch (e) {
        logger().info(`Delete certificate_type failed, error = ${e}`);
        responseUtil.fail(res, e)
    }
}

certificateTypeController.getAll = async (req, res, next) => {
    try {
        logger().info(`Query all certificate_types`);
        assertNotNull(req.query, new ParamIllegal('query url is required'));
        assertNotBlank(req.query.order_by, new ParamIllegal('order_by is required'));
        assertNotBlank(req.query.offset, new ParamIllegal('offset is required'));
        assertNotBlank(req.query.limit, new ParamIllegal('limit is required'));
        const result = await certificateTypeService.getAll(req.query.order_by, req.query.offset, req.query.limit);
        responseUtil.success(res, result);
    } catch (e) {
        logger().error(`Query all certificate_types failed, error = ${e}`);
        responseUtil.fail(res, e);
    }
}

certificateTypeController.getByCertificateTypeId = async (req, res, next) => {
    try {
        logger().info(`Query certificate_type by certificateTypeId request`);
        assertNotNull(req.params, new ParamIllegal('query parameter is required'));
        assertNotBlank(req.params.certificate_type_id, new ParamIllegal('certificate_type_id is required'));
        const result = await certificateTypeService.getByCertificateTypeId(req.params.certificate_type_id);
        responseUtil.success(res, result);
    } catch (e) {
        logger().error(`Query certificate_type by certificateTypeId failed, error = ${e}`);
        responseUtil.fail(res, e);
    }
}

export default certificateTypeController;