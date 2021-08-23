import { logger } from "express-glass";
import ParamIllegal from "../error/param_illegal";
import certificateService from "../service/certificate_service";
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

export default certificateController;