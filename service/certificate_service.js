import { logger } from "express-glass"
import Admin from "../model/admin";
import Certificate from "../model/certificate";
import User from "../model/user";

const certificateService = {}

certificateService.add = async (request) => {
    logger().info(`Add certificate request = ${request}`);

    const certificate = await Certificate.create({
        name: request.name,
        user_id: request.user_id,
        admin_id: request.admin_id,
        title: request.title,
        sc_address: request.sc_address,
        no: request.no,
        description: request.description,
        score: request.score,
        date: request.date,
        created_date: new Date().getTime(),
        updated_date: null,
        deleted_date: null
    });

    logger().info(`Add new certificate success`);
    return certificate;
}

certificateService.getByCertificateId = async (certificateId) => {
    logger().info(`Get certificate by certificate_id = ${certificateId}`);
    const certificate = await Certificate.findOne({include: [{model: User}, {model:Admin}], where: {certificate_id: certificateId}});
    logger().info(`Get certificate by certificate_id success`);
    return certificate;
}

export default certificateService;