import { Router } from 'express';
import SessionController from '../app/controllers/session/SessionController.js';

const sessionRoutes = new Router();

sessionRoutes.post('/session', SessionController.index);

export default sessionRoutes;
