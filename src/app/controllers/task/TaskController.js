import indexTask from './functions/index.js';
import storeTask from './functions/store.js';
import updateTask from './functions/update.js';
import deleteTask from './functions/delete.js';

class TaskController {
  async index(req, res) {
    return indexTask(req, res);
  }

  async store(req, res) {
    return storeTask(req, res);
  }

  async update(req, res) {
    return updateTask(req, res);
  }

  async delete(req, res) {
    return deleteTask(req, res);
  }
}

export default new TaskController();
