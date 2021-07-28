import { logger } from "express-glass";
import DataNotFound from "../error/data_not_found";
import ParamIllegal from "../error/param_illegal";
import User from "../model/user";
import { assertNotNull, assertTrue } from "../util/assert_util";
import { Op } from "sequelize";

const userService = {}

userService.add = async (request) => {
    logger().info(`Add new user, request = ${JSON.stringify(request)}`);

    assertTrue( !(await User.findOne({ where: {email: request.email} })),
        new ParamIllegal('email already registered'));
    assertTrue( !(await User.findOne({ where: {phone_number: request.phone_number} })),
        new ParamIllegal('phone_number already registered'));
    assertTrue( !(await User.findOne({ where: {public_key: request.public_key} })),
        new ParamIllegal('public_key already registered'));

    const user = await User.create({
        name: request.name,
        email: request.email,
        phone_number: request.phone_number,
        photo: request.photo,
        public_key: request.public_key,
        created_date: new Date().getTime(),
        updated_date: null,
        deleted_date: null
    });

    logger().info(`Add new user success`);
    return user;
}

userService.update = async (request) => {
    logger().info(`Update user, request = ${JSON.stringify(request)}`);
    const user = await User.findOne({ where: {user_id: request.user_id} });
    assertNotNull(user, new DataNotFound('user not found'));
    assertTrue( !(await User.findOne({ where: { [Op.and] : { user_id: { [Op.ne]: request.user_id }, email: request.email }}})),
        new ParamIllegal('email already registered'));
    assertTrue( !(await User.findOne({ where: { [Op.and] : { user_id: { [Op.ne]: request.user_id }, phone_number: request.phone_number }}})),
        new ParamIllegal('phone_number already registered'));
    assertTrue( !(await User.findOne({ where: { [Op.and] : { user_id: { [Op.ne]: request.user_id }, public_key: request.public_key }}})),
        new ParamIllegal('public_key already registered'));

    user.name = request.name;
    user.photo = request.photo;
    user.email = request.email;
    user.phone_number = request.phone_number;
    user.public_key = request.public_key;
    user.updated_date = new Date().getTime();
    await user.save();

    logger().info(`Update user success`);
    return user;
}

userService.getAll = async (orderBy, offset, limit) => {
    logger().info(`Get all users orderBy = ${orderBy} offset = ${offset} limit = ${limit}`);
    const users = await User.findAll({order: [ orderBy ], offset: Number(offset), limit: Number(limit)});
    logger().info(`Get all users success`);
    return users;
}

userService.getByUserId = async (userId) => {
    logger().info(`Get user by userId = ${userId}`);
    const user = await User.findOne({where : { user_id: userId }});
    logger().info(`Get user by userId success`);
    return user;
}

userService.getByPublicKey = async (publicKey) => {
    logger().info(`Get user by publickKey = ${publicKey}`);
    const user = await User.findOne({where : { public_key: publicKey }});
    logger().info(`Get user by publicKey success`);
    return user;
}


export default userService;