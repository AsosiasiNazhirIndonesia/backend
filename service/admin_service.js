import { logger } from "express-glass"
import env from "../config/env";
import connection from "../database/connection";
import DataNotFound from "../error/data_not_found";
import Admin from "../model/admin";
import { assertNotNull, assertTrue } from "../util/assert_util";
import web3 from "../util/web3";
import jwt from "jsonwebtoken";
import ParamIllegal from "../error/param_illegal";

const adminService = {}

adminService.getByPublicKey = async (publicKey) => {
    logger().info(`Get admin by publickKey = ${publicKey}`);
    const admin = await Admin.findOne({where : { public_key: publicKey }});
    logger().info(`Get admin by publicKey success`);
    return admin;
}

adminService.login = async (request) => {
    logger().info(`Login admin, request = ${JSON.stringify(request)}`);
    const dbTransaction = await connection.sequelize.transaction();
    try {
        const admin = await Admin.findOne({where: { admin_id: request.admin_id }, transaction: dbTransaction, lock: dbTransaction.LOCK.UPDATE});
        assertNotNull(admin, new DataNotFound('admin not found'));
        const message = `${env.PREFIX_SIGNATURE_DATA}${admin.login_nonce}`;

        const dataToSign = web3.utils.sha3(message);
        const address = web3.eth.accounts.recover(dataToSign, request.signature);
        assertTrue(address === admin.public_key, new ParamIllegal('invalid signature'));
        
        admin.login_nonce = admin.login_nonce + 1;
        admin.updated_date = new Date().getTime();
        await admin.save({ transaction: dbTransaction });
        const payload = {
            admin_id: admin.admin_id,
            public_key: admin.public_key,
            role: 'ADMIN'
        }
        const token = jwt.sign(payload, env.JWT_SECRET, {expiresIn: env.JWT_TTL });
        await dbTransaction.commit();
        logger().info(`Success to login admin`);
        return { token };
    } catch (e) {
        await dbTransaction.rollback();
        throw e;
    }
}

export default adminService;