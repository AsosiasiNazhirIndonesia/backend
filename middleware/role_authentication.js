import { logger } from "express-glass";
import Unauthorized from "../error/unauthorized";
import responseUtil from "../util/response_util";

export const AdminAuth = async (req, res, next) => {
    if (!req.auth || !req.auth.admin_id) {
        logger().error(`invalid admin role`);
        responseUtil.fail(res, new Unauthorized('UNAUTHORIZED'));
        return;
    }

    next();
}