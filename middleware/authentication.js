import { logger } from "express-glass";
import env from "../config/env";
import Unauthorized from "../error/unauthorized";
import responseUtil from "../util/response_util";
import jwt from "jsonwebtoken";
import ClientRepository from "../repository/client_repository";


const clientRepository = new ClientRepository();

export const AuthBasic = async (req, res, next) => {
    try {
        const auth = req.headers['authorization'];
        const arrAuth = auth.split(' ');
        if (arrAuth.legth < 2 || arrAuth[0] !== 'Basic') {
            throw 'authorization string unexpected';
        }

        const base64Str = auth.split(' ')[1];
        const str = Buffer.from(base64Str, 'base64').toString();
        const arrStr = str.split(':');
        if (arrStr.legth < 2 || env.API_KEY !== arrStr[0] || env.SECRET_KEY !== arrStr[1]) {
            throw 'invalid decoded authorization';
        }
        req.auth = { api_key: arrStr[0], secret_key: arrStr[1] }
        next();
    } catch (e) {
        logger().error(`auth basic validation failed, error = ${e}`);
        responseUtil.fail(res, new Unauthorized('UNAUTHORIZED'));
    }
    
}

export const JwtAuth = async (req, res, next) => {
    try {
        const auth = req.headers['authorization'];
        if (!auth) {
            throw 'authorization is not define'
        }

        const jwtToken = auth.split(' ')[1];
        req.auth = jwt.verify(jwtToken, env.JWT_SECRET);
        next();
    } catch(e) {
        logger().error(`invalid jwt token, error = ${e}`);
        responseUtil.fail(res, new Unauthorized('UNAUTHORIZED'));
    }
}