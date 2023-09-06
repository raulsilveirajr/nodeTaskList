import indexUser from './functions/index.js';
import storeUser from './functions/store.js';
import updateUser from './functions/update.js';

class UserController {
  async index(req, res) {
    return indexUser(req, res);
  }

  async store(req, res) {
    return storeUser(req, res);
  }

  async update(req, res) {
    return updateUser(req, res);
  }
}

export default new UserController();
