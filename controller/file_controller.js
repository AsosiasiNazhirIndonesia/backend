import { logger } from "express-glass";
import multer from "multer";
import env from "../config/env";
import InternalServerError from "../error/internal_server_error";
import ParamIllegal from "../error/param_illegal";
import responseUtil from "../util/response_util";
import { uploadFile } from "../util/file_util";
import mime from "mime";

const fileController = {}

fileController.upload = (req, res, next) => {
    logger().info(`request to upload file`);
    uploadFile(req, res, (err) => {
        fileController.postUpload(req, res, next, err);
    });
}

fileController.postUpload = (req, res, next, err) => {
    try {
        if (err instanceof multer.MulterError) {
            throw new ParamIllegal(err.message);
        } else if (err) {
            throw new InternalServerError(err.message);
        }

        if (!req.file) {
            throw new ParamIllegal('file is required')
        }

        logger().info(`success to upload file, original name = ${req.file.originalname}, result name = ${req.file.filename}`);
        responseUtil.success(res, {filename: req.file.filename});
    } catch (e) {
        logger().error(`upload file failed, error = ${e}`);
        responseUtil.fail(res, e);
    }
}

fileController.download = (req, res, next) => {
    logger().info(`request to download file, name = ${req.params.name}`);
    const name = req.params.name;
    try {
        if (!name) {
            throw new ParamIllegal('name is required');
        }
        const path = `${env.FILE_STORAGE}/${name}`;
        const type = mime.getType(path);
        res.setHeader('Content-Type', type);
        res.sendFile(path);
        logger().info(`success to download file`);
    } catch (e) {
        logger().error(`download file failed error = ${e}`);
        responseUtil.fail(res, e);
    }
}

export default fileController;