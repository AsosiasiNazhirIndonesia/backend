import { logger } from "express-glass";
import { Op } from "sequelize";
import connection from "../database/connection";
import DataNotFound from "../error/data_not_found";
import Admin from "../model/admin";
import Certificate from "../model/certificate";
import CertificateSigner from "../model/certificate_signer";
import User from "../model/user";
import { assertNotNull } from "../util/assert_util";
import { notifySigner } from "../util/send_email";

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
            receiver_name: request.receiver_name,
            sc_address: request.sc_address,
            receiver_name: request.receiver_name,
            no: request.no,
            description: request.description,
            score: request.score,
            date: request.date,
            logo: request.logo,
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
        notifySigner(result.certificate_id);
        return result;
    } catch(e) {
        logger().error(`Add new certificate failed`);
        await dbTransaction.rollback();
        throw e;
    }
}

certificateService.signing = async (request) => {
    logger().info(`Signing certificate request = ${JSON.stringify(request)}`);
    const certificateSigner = await CertificateSigner.findOne({where: {certificate_id: request.certificate_id, user_id: request.user_id}});
    certificateSigner.is_sign = true;
    certificateSigner.updated_date = new Date().getTime();
    await certificateSigner.save();
    notifySigner(certificateSigner.certificate_id);
    logger().info(`Success to signing certificate`);
}

certificateService.getAll = async (orderBy, offset, limit) => {
    logger().info(`Get all certificates orderBy = ${orderBy} offset = ${offset} limit = ${limit}`);
    const certificates = await Certificate.findAll({order: [ [orderBy, "DESC"] ], offset: Number(offset), limit: Number(limit), include: [{model: User}, {model: Admin}, {model: CertificateSigner, include: User}]});
    logger().info(`Get all certificates sucess`);
    return certificates;
}

certificateService.getByAdmin = async (adminId, orderBy, offset, limit) => {
    logger().info(`Get certificates by adminId = ${adminId} orderBy = ${orderBy} offset = ${offset} limit = ${limit}`);
    const certificates = await Certificate.findAll({where: {admin_id: adminId}, include: [{model: User}, {model: Admin}, {model: CertificateSigner, include: User}]}, {order: [ [orderBy, "DESC"] ], offset: Number(offset), limit: Number(limit), include: [{model: User}, {model: Admin}, {model: CertificateSigner, include: User}]});
    logger().info(`Get certificates by adminId sucess`);
    return certificates;
}

certificateService.getByUser = async (userId, orderBy, offset, limit) => {
    logger().info(`Get certificates by userId = ${userId} orderBy = ${orderBy} offset = ${offset} limit = ${limit}`);
    const certificateSigners = await CertificateSigner.findAll({where: {user_id: userId}});
    let certificates = [];
    if (certificateSigners.length > 0) {
        certificates = await Certificate.findAll({where: {[Op.or]: [{user_id: userId}, {certificate_id: {[Op.in]: [certificateSigners.map((o) => { return o.certificate_id;})]} }] }, include: [{model: User}, {model: Admin}, {model: CertificateSigner, include: User}]}, {order: [ [orderBy, "DESC"] ], offset: Number(offset), limit: Number(limit)});
    } else {
        certificates = await Certificate.findAll({where: {user_id: userId}, include: [{model: User}, {model: Admin}, {model: CertificateSigner, include: User}]}, {order: [ [orderBy, "DESC"] ], offset: Number(offset), limit: Number(limit)});
    }
    
    logger().info(`Get certificates by userId sucess`);
    return certificates;
}

certificateService.getByCertificateId = async (certificateId) => {
    logger().info(`Get certificate by certificate_id = ${certificateId}`);
    const certificate = await Certificate.findOne({include: [{model: User}, {model: Admin}, {model: CertificateSigner, include: User}], where: {certificate_id: certificateId}});
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