import { logger } from "express-glass"
import env from "../config/env";
import connection from "../database/connection";
import DataNotFound from "../error/data_not_found";
import Admin from "../model/admin";
import { assertNotBlank, assertNotNull, assertTrue } from "../util/assert_util";
import web3 from "../util/web3";
import jwt from "jsonwebtoken";
import ParamIllegal from "../error/param_illegal";
import { Op } from "sequelize";
import { ADMIN_ROLE } from "../constant/admin_role";
import Institution from "../model/institution";

const adminService = {}

adminService.add = async (request) => {
    logger().info(`Add new admin, request = ${JSON.stringify(request)}`);

    assertTrue( !(await Admin.findOne({ where: {email: request.email} })), 
        new ParamIllegal('email already registered'));
    assertTrue( !(await Admin.findOne({ where: {phone_number: request.phone_number} })),
        new ParamIllegal('phone_number already registered'));
    assertTrue( !(await Admin.findOne({ where: {public_key: request.public_key} })),
        new ParamIllegal('public_key already registered'));
    if (request.admin_role === ADMIN_ROLE.INSTITUTION) {
        assertNotBlank(request.institution_id, new ParamIllegal('institution admin must be assign to institution'));
        assertNotNull(await Institution.findOne({ where: { institution_id: request.institution_id } }),
            new DataNotFound('institution not found'));
    }

    const admin = await Admin.create({
        admin_id: request.admin_id,
        name: request.name,
        photo: request.photo,
        email: request.email,
        phone_number: request.phone_number,
        admin_role: request.admin_role,
        institution_id: request.institution_id,
        public_key: request.public_key,
        created_date: new Date().getTime(),
        updated_date: null,
        deleted_date: null
    });

    logger().info(`Add new admin success`);
    return admin;
}

adminService.update = async (request) => {
    logger().info(`Update admin, request = ${JSON.stringify(request)}`);
    const admin = await Admin.findOne({ where: {admin_id: request.admin_id} });
    assertNotNull(admin, new DataNotFound('admin not found'));
    assertTrue( !(await Admin.findOne({ where: { [Op.and] : { admin_id: { [Op.ne] : request.admin_id }, email: request.email}}})),
        new ParamIllegal('email already registered'));
    assertTrue( !(await Admin.findOne({ where: { [Op.and] : { admin_id: { [Op.ne] : request.admin_id }, phone_number: request.phone_number}}})),
        new ParamIllegal('phone_number already registered'));
    assertTrue( !(await Admin.findOne({ where: { [Op.and] : { admin_id: { [Op.ne] : request.admin_id}, public_key: request.public_key}}})),
        new ParamIllegal('public_key already registered'));

    admin.name = request.name;
    admin.photo = request.photo;
    admin.email = request.email;
    admin.phone_number = request.phone_number;
    admin.admin_role = request.admin_role;
    admin.public_key = request.public_key;
    admin.institution_id = request.institution_id;
    admin.updated_date = new Date().getTime();
    await admin.save();

    logger().info(`Update admin success`);
    return admin;
}

adminService.getByPublicKey = async (publicKey) => {
    logger().info(`Get admin by publickKey = ${publicKey}`);
    const admin = await Admin.findOne({where : { public_key: publicKey }});
    logger().info(`Get admin by publicKey success`);
    return admin;
}

adminService.getAll = async (orderBy, orderType, offset, limit) => {
    logger().info(`Get all admins orderBy = ${orderBy} orderType = ${orderType} offset = ${offset} limit = ${limit}`);
    const admins = await Admin.findAll({
        where : { deleted_date: { [Op.eq]: null } }, 
        include: [{model: Institution}],
        order: [[orderBy, orderType]],
        offset: Number(offset),
        limit: Number(limit) });
    logger().info(`Get all admins success`);
    return admins;
}

adminService.login = async (request) => {
    logger().info(`Login admin, request = ${JSON.stringify(request)}`);
    const dbTransaction = await connection.sequelize.transaction();
    try {
        const admin = await Admin.findOne({where: { admin_id: request.admin_id }, transaction: dbTransaction, lock: dbTransaction.LOCK.UPDATE});
        assertNotNull(admin, new DataNotFound('admin not found'));
        
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