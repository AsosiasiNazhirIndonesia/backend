import { logger } from "express-glass";
import responseUtil from "../util/response_util";

const { Magic } = require('@magic-sdk/admin');
const magic = new Magic(process.env.MAGIC_SECRET_KEY);

const magicController = {}

magicController.login = async (req, res, next) => {
    try {
        const didToken = req.headers.authorization.substr(7);
        logger().info(`Magic login, data ${JSON.stringify(didToken)}`);
        const result = await magic.token.validate(didToken);
        responseUtil.success(res, result);
    } catch (e) {
        logger().info(`Magic login failed, error ${e}`);
        responseUtil.fail(res, e);
    }
}


export default magicController;