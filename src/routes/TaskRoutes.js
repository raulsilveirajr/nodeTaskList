import { Router } from 'express';
import TaskController from '../app/controllers/task/TaskController.js';

const taskRoutes = new Router();

const root = '/tasks';

taskRoutes.get(root, TaskController.index);
taskRoutes.post(root, TaskController.store);
taskRoutes.put(`${root}/:id`, TaskController.update);
taskRoutes.delete(`${root}/:id`, TaskController.delete);

export default taskRoutes;
