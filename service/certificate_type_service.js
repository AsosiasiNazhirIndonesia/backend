import { logger } from "express-glass";
import { Op } from "sequelize";
import DataNotFound from "../error/data_not_found";
import CertificateType from "../model/certificate_type";
import { assertNotNull, assertTrue } from "../util/assert_util";

const certificateTypeService = {}

certificateTypeService.add = async (request) => {
    logger().info(`Add new certificate type, request = ${JSON.stringify(request)}`);

    const certificate_type = await CertificateType.create({
        type: request.certificate_type,
       
    });

    logger().info(`Add new certificate_type success`);
    return certificate_type;
};

certificateTypeService.update = async (request) => {
    logger().info(`Update certificate type, request = ${JSON.stringify(request)}`);
    const certificate_type = await CertificateType.findOne({ where: {certificate_type_id: request.certificate_type_id} });
    assertNotNull(certificate_type, new DataNotFound('Certificate Type not found'));
    
    certificate_type.type= request.certificate_type;
    await certificate_type.save();

    logger().info(`Update certificate_type success`);
    return certificate_type;
}

certificateTypeService.delete = async (request) => {
    logger().info(`Delete certificate_type, request = ${JSON.stringify(request)}`);
    const certificate_type = await CertificateType.findOne({ where: {certificate_type_id: request.certificate_type_id} });
    assertNotNull(certificate_type, new DataNotFound('CertificateType not found'));

    await certificate_type.destroy();

    logger().info(`Delete certificate_type success`);
    // return certificate_type;
}

certificateTypeService.getAll = async (orderBy, offset, limit) => {
    logger().info(`Get all certificate_types orderBy = ${orderBy} offset = ${offset} limit = ${limit}`);
    const certificate_type = await CertificateType.findAll({ order: [ [orderBy, 'DESC'] ], offset: Number(offset), limit: Number(limit)});
    logger().info(`Get all certificate_types sucess`);
    return certificate_type;
}

certificateTypeService.getByCertificateTypeId = async (certificate_typeId) => {
    logger().info(`Get certificate_type by certificate_typeId = ${certificate_typeId}`);
    const certificate_type = await CertificateType.findOne({ where: { certificate_type_id: certificate_typeId }});
    logger().info(`Get certificate_types by certificate_typeId success`);
    return certificate_type;
} 

export default certificateTypeService;