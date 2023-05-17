import express from 'express';
import adminController from './controller/admin_controller';
import certificateController from './controller/certificate_controller';
import fileController from './controller/file_controller';
import institutionController from './controller/institution_controller';
import certificateTypeController from './controller/certificate_type_controller';
import roleController from './controller/role_controller';
import userController from './controller/user_controller';
import userHistoryController from './controller/user_history_controller';
import magicController from './controller/magic_controller';

const routes = express();

routes.post('/admins', adminController.add);
routes.put('/admins', adminController.update);
routes.get('/admins', adminController.getAll);
routes.get('/admins/public_key/:public_key', adminController.getByPublicKey);
routes.post('/admins/login', adminController.login);

routes.post('/users', userController.add);
routes.post('/users/login', userController.login);
routes.put('/users', userController.update);
routes.get('/users', userController.getAll);
routes.get('/users/:user_id', userController.getById);
routes.get('/users/public_key/:public_key', userController.getByPublicKey);
routes.delete('/users', userController.delete);

routes.post('/institutions', institutionController.add);
routes.put('/institutions', institutionController.update);
routes.delete('/institutions', institutionController.delete);
routes.get('/institutions', institutionController.getAll);
routes.get('/institutions/:institution_id', institutionController.getByInstitutionId);

routes.post('/certificatetypes', certificateTypeController.add);
routes.put('/certificatetypes', certificateTypeController.update);
routes.delete('/certificatetypes', certificateTypeController.delete);
routes.get('/certificatetypes', certificateTypeController.getAll);
routes.get('/certificatetypes/:certificate_type_id', certificateTypeController.getByCertificateTypeId);

routes.post('/roles', roleController.add);
routes.put('/roles', roleController.update);
routes.delete('/roles', roleController.delete);
routes.get('/roles', roleController.getAll);
routes.get('/roles/:role_id', roleController.getByRoleId);

routes.post('/user_history', userHistoryController.add);
routes.put('/user_history', userHistoryController.update);
routes.delete('/user_history', userHistoryController.delete);
routes.get('/user_history', userHistoryController.getAll);
routes.get('/user_history/:user_history_id', userHistoryController.getByUserHistoryId);
routes.get('/user_history/user_id/:user_id', userHistoryController.getByUserId);

routes.post('/certificates', certificateController.add);
routes.put('/certificates', certificateController.update);
routes.post('/certificates/signing', certificateController.sign);
routes.get('/certificates', certificateController.getAll);
routes.get('/certificates/:certificate_id', certificateController.getByCertificateId);
routes.get('/certificates/sc_address_token_id/:sc_address/:token_id', certificateController.getByScAddressAndTokenId);
routes.get('/certificates/admin_id/:admin_id', certificateController.getByAdmin);
routes.get('/certificates/user_id/:user_id', certificateController.getByUser);

routes.post('/files', fileController.upload);
routes.get('/files/:name', fileController.download);

routes.post('/login', magicController.login);

export default routes;