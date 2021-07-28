import { logger } from "express-glass"
import Admin from "../model/admin";

const adminService = {}

adminService.getByPublicKey = async (publicKey) => {
    logger().info(`Get admin by publickKey = ${publicKey}`);
    const admin = await Admin.findOne({where : { public_key: publicKey }});
    logger().info(`Get admin by publicKey success`);
    return admin;
}

export default adminService;