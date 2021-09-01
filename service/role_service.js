import { logger } from "express-glass";
import { Op } from "sequelize";
import DataNotFound from "../error/data_not_found";
import ParamIllegal from "../error/param_illegal";
import Role from "../model/role";
import { assertNotNull, assertTrue } from "../util/assert_util";

const roleService = {}

roleService.add = async (request) => {
    logger().info(`Add new role, request = ${JSON.stringify(request)}`);

    assertTrue( !(await Role.findOne({ where: {name: request.name} })), 
        new ParamIllegal('name already registered'));

    const role = await Role.create({
        name: request.name,
        description: request.description,
        created_date: new Date().getTime(),
        updated_date: null,
        deleted_date: null
    });

    logger().info(`Add new role success`);
    return role;
}

roleService.update = async (request) => {
    logger().info(`Update role, request = ${JSON.stringify(request)}`);
    const role = await Role.findOne({ where: {role_id: request.role_id} });
    assertNotNull(role, new DataNotFound('role not found'));
    assertTrue( !(await Role.findOne({ where: { [Op.and]: { role_id: { [Op.ne]: request.role_id }, name: request.name } } })),
        new ParamIllegal('name already registered'));
    
    role.name = request.name;
    role.description = request.description;
    role.updated_date = new Date().getTime();
    await role.save();

    logger().info(`Update role success`);
    return role;
}

roleService.delete = async (request) => {
    logger().info(`Delete role, request = ${JSON.stringify(request)}`);
    const role = await Role.findOne({ where: {role_id: request.role_id} });
    assertNotNull(role, new DataNotFound('role not found'));

    role.deleted_date = new Date().getTime();
    await role.save();

    logger().info(`Delete role success`);
    return role;
}

roleService.getAll = async (orderBy, offset, limit) => {
    logger().info(`Get all roles orderBy = ${orderBy} offset = ${offset} limit = ${limit}`);
    const role = await Role.findAll({where: {deleted_date: {[Op.eq]: null}}},{order: [ orderBy ], offset: Number(offset), limit: Number(limit)});
    logger().info(`Get all roles success`);
    return role;
}

roleService.getByRoleId = async (roleId) => {
    logger().info(`Get role by roleId = ${roleId}`);
    const role = await Role.findOne({ where: { role_id: roleId }});
    logger().info(`Get role by roleId success`);
    return role;
}

export default roleService;