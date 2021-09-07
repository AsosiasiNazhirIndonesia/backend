import { logger } from "express-glass";
import DataNotFound from "../error/data_not_found";
import ParamIllegal from "../error/param_illegal";
import User from "../model/user";
import { assertNotNull, assertTrue } from "../util/assert_util";
import { Op } from "sequelize";
import jwt from "jsonwebtoken";
import env from "../config/env";
import connection from "../database/connection";
import web3 from "../util/web3";
import UserHistory from "../model/user_history";
import Role from "../model/role";
import Institution from "../model/institution";

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
    const users = await User.findAll({where: {deleted_date: {[Op.eq]: null}}, include: [{model: UserHistory, include: [{model: Role}, {model: Institution}]}]},{order: [ orderBy ], offset: Number(offset), limit: Number(limit)});
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

userService.login = async (request) => {
    logger().info(`Login user, request = ${JSON.stringify(request)}`);
    const dbTransaction = await connection.sequelize.transaction();
    try {
        const user = await User.findOne({where: { user_id: request.user_id }, transaction: dbTransaction, lock: dbTransaction.LOCK.UPDATE});
        assertNotNull(user, new DataNotFound('user not found'));
        const message = `${env.PREFIX_SIGNATURE_DATA}${user.login_nonce}`;

        const dataToSign = web3.utils.sha3(message);
        const address = web3.eth.accounts.recover(dataToSign, request.signature);
        console.log(dataToSign);
        console.log(address);
        console.log(user.public_key);
        assertTrue(address.toLowerCase() === user.public_key.toLowerCase(), new ParamIllegal('invalid signature'));
        
        user.login_nonce = user.login_nonce + 1;
        user.updated_date = new Date().getTime();
        await user.save({ transaction: dbTransaction });
        const payload = {
            user_id: user.user_id,
            public_key: user.public_key,
            role: 'USER'
        }
        const token = jwt.sign(payload, env.JWT_SECRET, {expiresIn: env.JWT_TTL });
        await dbTransaction.commit();
        logger().info(`Success to login user`);
        return { token };
    } catch (e) {
        await dbTransaction.rollback();
        throw e;
    }
}

userService.delete = async (request) => {
    logger().info(`Delete user, required = ${JSON.stringify(request)}`);
    const user = await User.findOne({ where: {user_id: request.user_id} });
    assertNotNull(user, new DataNotFound('user not found'));

    user.deleted_date = new Date().getTime();
    await user.save();

    logger().info(`Delete user success`);
    return user;
}


export default userService;