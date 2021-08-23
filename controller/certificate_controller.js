import { logger } from "express-glass";
import ParamIllegal from "../error/param_illegal";
import certificateService from "../service/certificate_service";
import { assertNotBlank, assertNotNull } from "../util/assert_util";
import responseUtil from "../util/response_util";
import certificateValidator from "../validator/certificate_validator";

const certificateController = {}

certificateController.add = async (req, res, next) => {
    try {
        logger().info(`Add new certificate request, data = ${JSON.stringify(req.body)}`);
        const validationResult = certificateValidator.add.validate(req.body);
        if (validationResult.error) {
            throw new ParamIllegal(validationResult.error.message);
        }
        const value = validationResult.value;
        const result = await certificateService.add(value);
        responseUtil.success(res, result);
    } catch (e) {
        logger().info(`Add new institution failed, error = ${e}`);
        responseUtil.fail(res, e);
    }
}

certificateController.getByCertificateId = async (req, res, next) => {
    try {
        logger().info(`Query certificate by certificate_id request`);
        assertNotNull(req.params, new ParamIllegal('query is required'));
        assertNotBlank(req.params.certificate_id, new ParamIllegal('certificate_id is required'));
        const result = await certificateService.getByCertificateId(req.params.certificate_id);
        responseUtil.success(res, result);
    } catch (e) {
        logger().error(`Query certificate by certificate_id failed, error = ${e}`);
        responseUtil.fail(res, e);
    }
}

export default certificateController;