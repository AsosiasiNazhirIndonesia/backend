import express from 'express';
import adminController from './controller/admin_controller';
import certificateController from './controller/certificate_controller';
import institutionController from './controller/institution_controller';
import roleController from './controller/role_controller';
import userController from './controller/user_controller';
import userHistoryController from './controller/user_history_controller';

const routes = express();

routes.post('/admins', adminController.add);
routes.put('/admins', adminController.update);
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
routes.get('/certificates', certificateController.getAll);
routes.get('/certificates/:certificate_id', certificateController.getByCertificateId);
routes.get('/certificates/sc_address/:sc_address', certificateController.getByScAddress);

export default routes;