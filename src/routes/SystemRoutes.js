import { Router } from 'express';
import SystemController from '../app/controllers/system/SystemController.js';

const routesSystem = new Router();

routesSystem.get('/system', SystemController.index);

export default routesSystem;
