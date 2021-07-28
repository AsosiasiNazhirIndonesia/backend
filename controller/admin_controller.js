import { logger } from "express-glass";
import ParamIllegal from "../error/param_illegal";
import adminService from "../service/admin_service";
import { assertNotBlank, assertNotNull } from "../util/assert_util";
import responseUtil from "../util/response_util";

const adminController = {}

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

export default adminController;