import express from 'express';
import adminController from './controller/admin_controller';
import institutionController from './controller/institution_controller';
import roleController from './controller/role_controller';
import userController from './controller/user_controller';

const routes = express();

routes.get('/admins/public_key/:public_key', adminController.getByPublicKey);

routes.post('/users', userController.add);
routes.put('/users', userController.update);
routes.get('/users', userController.getAll);
routes.get('/users/:user_id', userController.getById);
routes.get('/users/public_key/:public_key', userController.getByPublicKey);

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

export default routes;