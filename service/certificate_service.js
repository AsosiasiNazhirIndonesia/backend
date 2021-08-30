import { logger } from "express-glass";
import connection from "../database/connection";
import DataNotFound from "../error/data_not_found";
import Admin from "../model/admin";
import Certificate from "../model/certificate";
import CertificateSigner from "../model/certificate_signer";
import User from "../model/user";
import { assertNotNull } from "../util/assert_util";

const certificateService = {}

certificateService.add = async (request) => {
    logger().info(`Add certificate request = ${request}`);
    const dbTransaction = await connection.sequelize.transaction();

    try {
        assertNotNull(await User.findOne({where: {user_id: request.user_id}}), 
            new DataNotFound('user not found'));
        assertNotNull(await Admin.findOne({where: {admin_id: request.admin_id}}), 
            new DataNotFound('admin not found'));
        

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
        }, { transaction: dbTransaction});

        for (const signer of request.certificate_signers) {
            await CertificateSigner.create({
                certificate_id: certificate.certificate_id,
                user_id: signer.user_id,
                priority: signer.priority,
                created_date: new Date().getTime(),
                updated_date: null,
                deleted_date: null
            }, { transaction: dbTransaction});
        }

        logger().info(`Add new certificate success`);
        await dbTransaction.commit();
        const result = await Certificate.findOne({where: {certificate_id: certificate.certificate_id}});
        return result;
    } catch(e) {
        logger().error(`Add new certificate failed`);
        await dbTransaction.rollback();
        throw e;
    }
}

certificateService.getAll = async (orderBy, offset, limit) => {
    logger().info(`Get all certificates orderBy = ${orderBy} offset = ${offset} limit = ${limit}`);
    const certificates = await Certificate.findAll({order: [ orderBy ], offset: Number(offset), limit: Number(limit), include: [{model: User}, {model: Admin}, {model: CertificateSigner, include: User}]});
    logger().info(`Get all certificates sucess`);
    return certificates;
}

certificateService.getByCertificateId = async (certificateId) => {
    logger().info(`Get certificate by certificate_id = ${certificateId}`);
    const certificate = await Certificate.findOne({include: [{model: User}, {model:Admin}, {model: CertificateSigner, include: {model:User}}], where: {certificate_id: certificateId}});
    logger().info(`Get certificate by certificate_id success`);
    return certificate;
}

certificateService.getByScAddress = async (scAddress) => {
    logger().info(`Get certificate by sc_address = ${scAddress}`);
    const certificate = await Certificate.findOne({include: [{model: User}, {model:Admin}, {model: CertificateSigner, include: {model:User}}], where: {sc_address: scAddress}});
    logger().info(`Get certificate by sc_address success`);
    return certificate;
}

export default certificateService;