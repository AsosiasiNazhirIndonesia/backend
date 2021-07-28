import multer from 'multer';
import env from '../config/env';
import uuid from 'uuid';

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, env.FILE_STORAGE);
    },
    filename: function (req, file, cb) {
        const names = file.originalname.split('.');
        cb(null, uuid.v1()+'.'+names[names.length - 1]);
    }
})

export const uploadFile = multer({ storage: storage, limits: { fileSize: env.FILE_MAXIMUM_SIZE } }).single('file');