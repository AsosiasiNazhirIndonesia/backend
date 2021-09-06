import { logger } from "express-glass";
import User from "../model/user";
import Institution from "../model/institution"
import Role from "../model/role";
import UserHistory from "../model/user_history";
import { assertNotNull } from "../util/assert_util";
import DataNotFound from "../error/data_not_found";
import { Op } from "sequelize";


const userHistoryService = {}

userHistoryService.add = async (request) => {
    logger().info(`Add new user_history, request = ${JSON.stringify(request)}`);

    const user = await User.findOne({ where: {user_id: request.user_id} });
    assertNotNull(user, new DataNotFound('user_id not found'));
    const instution = await Institution.findOne({ where: {institution_id: request.institution_id} });
    assertNotNull(instution, new DataNotFound('institution_id not found'));
    const role = await Role.findOne({ where: {role_id: request.role_id} });
    assertNotNull(role, new DataNotFound('role_id not found'));

    const userHistory = await UserHistory.create({
        user_id: request.user_id,
        institution_id: request.institution_id,
        role_id: request.role_id,
        start_date: request.start_date,
        end_date: request.end_date,
        created_date: new Date().getTime(),
        updated_date: null,
        deleted_date: null
    });

    logger().info(`Add new user_history success`);
    return userHistory;
}

userHistoryService.update = async (request) => {
    logger().info(`Update user_history, requset = ${JSON.stringify(request)}`);

    const userHistory = await UserHistory.findOne({ where: {user_history_id: request.user_history_id} });
    assertNotNull(userHistory, new DataNotFound('user history not found'));
    const user = await User.findOne({ where: {user_id: request.user_id} });
    assertNotNull(user, new DataNotFound('user_id not found'));
    const instution = await Institution.findOne({ where: {institution_id: request.institution_id} });
    assertNotNull(instution, new DataNotFound('institution_id not found'));
    const role = await Role.findOne({ where: {role_id: request.role_id} });
    assertNotNull(role, new DataNotFound('role_id not found'));

    userHistory.user_id = request.user_id;
    userHistory.institution_id = request.institution_id;
    userHistory.role_id = request.role_id;
    userHistory.start_date = request.start_date;
    userHistory.end_date = request.end_date;
    userHistory.updated_date = new Date().getTime();
    await userHistory.save();

    logger().info(`Update user_history success`);
    return userHistory;
}

userHistoryService.delete = async (request) => {
    logger().info(`Delete user_history, required = ${JSON.stringify(request)}`);
    const userHistory = await UserHistory.findOne({ where: {user_history_id: request.user_history_id} });
    assertNotNull(userHistory, new DataNotFound('user history not found'));

    userHistory.deleted_date = new Date().getTime();
    await userHistory.save();

    logger().info(`Delete user_history success`);
    return userHistory;
}

userHistoryService.getAll = async (orderBy, offset, limit) => {
    logger().info(`Get all user_history orderBy = ${orderBy} offset = ${offset} limit = ${limit}`);
    const userHistory = await UserHistory.findAll({include: [{model: Institution}, {model: Role}], order: [orderBy], offset: Number(offset), limit: Number(limit)});
    logger().info(`Get all user_history success`);
    return userHistory;
}

userHistoryService.getByUserHistoryId = async (userHistoryId) => {
    logger().info(`Get user_history by user_history_id = ${userHistoryId}`);
    const userHistory = await UserHistory.findOne({include: [{model: Institution}, {model: Role}], where: {user_history_id: userHistoryId}});
    logger().info(`Get user_history by user_history_id success`);
    return userHistory;
}

userHistoryService.getByUserId = async (userId) => {
    logger().info(`Get user_history by user_id = ${userId}`);
    const userHistory = await UserHistory.findAll({include: [{model: Institution}, {model: Role}], where: {user_id: userId, deleted_date: { [Op.eq]: null }}});
    logger().info(`Get user_history by user_id success`);
    return userHistory;
}

export default userHistoryService;