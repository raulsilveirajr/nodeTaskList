import indexUser from './functions/index.js';

class SessionController {
  async index(req, res) {
    return indexUser(req, res);
  }
}

export default new SessionController();
