import { Router } from 'express';
import UserController from '../app/controllers/user/UserController.js';

const userRoutes = new Router();

userRoutes.get('/users', UserController.index);
userRoutes.post('/users', UserController.store);
userRoutes.put('/users', UserController.update);

export default userRoutes;
