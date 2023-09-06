import { Router } from 'express';
import sessionRoutes from './SessionRoutes.js';
import systemRoutes from './SystemRoutes.js';
import userRoutes from './UserRoutes.js';
import taskRoutes from './TaskRoutes.js';

import authMiddleware from '../app/middlewares/auth.js';

const routes = new Router();

// open routes
routes.use(sessionRoutes);

// Add auth token as mandatory
routes.use(authMiddleware);

// closed routes
routes.use(userRoutes);
routes.use(systemRoutes);
routes.use(taskRoutes);
routes.get('/test', async (req, res) => res.json({ status: 'running' }));

export default routes;
