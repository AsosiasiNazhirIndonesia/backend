import { logger } from "express-glass";
import { Op } from "sequelize";
import DataNotFound from "../error/data_not_found";
import ParamIllegal from "../error/param_illegal";
import Institution from "../model/institution";
import { assertNotNull, assertTrue } from "../util/assert_util";

const institutionService = {}

institutionService.add = async (request) => {
    logger().info(`Add new institution, request = ${JSON.stringify(request)}`);

    assertTrue( !(await Institution.findOne({ where: {email: request.email} })),
        new ParamIllegal('email already registered'));
    assertTrue( !(await Institution.findOne({ where: {phone_number: request.phone_number} })),
        new ParamIllegal('phone_number already registered'));

    const institution = await Institution.create({
        name: request.name,
        email: request.email,
        phone_number: request.phone_number,
        address: request.address,
        type: request.type,
        sc_address: request.sc_address, // TO DO
        created_date: new Date().getTime(),
        updated_date: null,
        deleted_date: null
    });

    logger().info(`Add new institution success`);
    return institution;
};

institutionService.update = async (request) => {
    logger().info(`Update institution, request = ${JSON.stringify(request)}`);
    const institution = await Institution.findOne({ where: {institution_id: request.institution_id} });
    assertNotNull(institution, new DataNotFound('Institution not found'));
    assertTrue( !(await Institution.findOne({ where: { [Op.and]: { institution_id: { [Op.ne]: request.institution_id }, email: request.email } } })),
        new ParamIllegal('email already registered'));
    assertTrue( !(await Institution.findOne({ where: { [Op.and]: { institution_id: { [Op.ne]: request.institution_id}, phone_number: request.phone_number}} })),
        new ParamIllegal('phone_number already registered'));
    
    institution.name = request.name;
    institution.email = request.email;
    institution.phone_number = request.phone_number;
    institution.address = request.address;
    institution.type = request.type;
    institution.updated_date = new Date().getTime();
    await institution.save();

    logger().info(`Update institution success`);
    return institution;
}

institutionService.delete = async (request) => {
    logger().info(`Delete institution, request = ${JSON.stringify(request)}`);
    const institution = await Institution.findOne({ where: {institution_id: request.institution_id} });
    assertNotNull(institution, new DataNotFound('Institution not found'));

    institution.deleted_date = new Date().getTime();
    await institution.save();

    logger().info(`Delete institution success`);
    return institution;
}

institutionService.getAll = async (orderBy, offset, limit) => {
    logger().info(`Get all institutions orderBy = ${orderBy} offset = ${offset} limit = ${limit}`);
    const institution = await Institution.findAll({where: {deleted_date: { [Op.eq]: null}}, order: [ [orderBy, 'DESC'] ], offset: Number(offset), limit: Number(limit)});
    logger().info(`Get all institutions sucess`);
    return institution;
}

institutionService.getByInstitutionId = async (institutionId) => {
    logger().info(`Get institution by institutionId = ${institutionId}`);
    const institution = await Institution.findOne({ where: { institution_id: institutionId }});
    logger().info(`Get institutions by institutionId success`);
    return institution;
} 

export default institutionService;