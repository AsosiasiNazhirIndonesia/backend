import express from 'express';
import adminController from './controller/admin_controller';
import userController from './controller/user_controller';

const routes = express();

routes.get('/admins/public_key/:public_key', adminController.getByPublicKey);

routes.post('/users', userController.add);
routes.put('/users', userController.update);
routes.get('/users', userController.getAll);
routes.get('/users/:user_id', userController.getById);
routes.get('/users/public_key/:public_key', userController.getByPublicKey);

export default routes;